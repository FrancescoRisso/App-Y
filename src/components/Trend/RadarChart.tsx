/*

description:
	
	
state:
	- 
	
hooks:
	- 
	
context:
	- 
	
imported into:
	- 
	
component dependences:
	- 
	
other dependences:
	- 
	
*/

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { allGraphOptions, graphDataSetDetails, graphDataSetDetailsOptionals } from "../../types";

export interface RadarChartProps {
	labels: string[];
	data: graphDataSetDetailsOptionals[];
	options: Partial<allGraphOptions>;
}

const RadarChart = ({ data, labels, options }: RadarChartProps) => {
	const baseAngle = useMemo(() => 360 / labels.length, [labels]);

	const size = useMemo(() => 100, []);
	const center = useMemo(() => size / 2, [size]);
	const lineLen = useMemo(() => 0.7, []);
	const strokeWidth = useMemo(() => 0.3, []);

	const defaults: allGraphOptions = useMemo(() => {
		return {
			strokeColor: "black",
			fontSize: "auto",
			numTicks: 1
		};
	}, []);

	const settings: allGraphOptions = useMemo(() => {
		return Object.assign(JSON.parse(JSON.stringify(defaults)), options);
	}, [defaults, options]);

	const defaultData: graphDataSetDetails = useMemo(() => {
		return {
			values: [],
			pointRadius: 1,
			color: "black",
			name: "",
			strokeWidth: 1,
			fillOpacity: 0.2
		};
	}, []);

	const allLines: graphDataSetDetailsOptionals[] = useMemo(
		() => [
			...Array.from({ length: settings.numTicks }, (x, i) => i + 1).map((tick): graphDataSetDetailsOptionals => {
				return {
					values: Array(labels.length).fill(tick / settings.numTicks),
					name: `tick-${tick}`,
					color: settings.strokeColor,
					pointRadius: 0,
					strokeWidth: strokeWidth,
					fillOpacity: 0
				};
			}),
			...data
		],
		[data, settings, strokeWidth, labels]
	);

	const graphRef = useRef<SVGSVGElement>(null);

	const [svgX, setSvgX] = useState<number>(0);
	const [svgY, setSvgY] = useState<number>(0);
	const [svgW, setSvgW] = useState<number>(1);
	const [svgH, setSvgH] = useState<number>(1);

	const [state, updateState] = useState<Object>();
	const forceUpdate = useCallback(() => updateState({}), []);

	useEffect(() => {
		if (graphRef.current !== null && graphRef.current.getBoundingClientRect().width !== 0) {
			setSvgX(graphRef.current.getBoundingClientRect().left);
			setSvgY(graphRef.current.getBoundingClientRect().top);
			setSvgW(graphRef.current.getBoundingClientRect().width);
			setSvgH(graphRef.current.getBoundingClientRect().height);
		} else forceUpdate();
	}, [graphRef, state, forceUpdate]);

	return (
		<svg preserveAspectRatio="xMidYMid meet" viewBox={`0 0 ${size} ${size}`} ref={graphRef}>
			{labels.map((name, index) => (
				<g key={index} id={`label-${name}`}>
					<line
						x1={center}
						x2={center}
						y1={center}
						y2={(1 - lineLen) * center}
						stroke={settings.strokeColor}
						strokeWidth={strokeWidth}
						transform={`rotate(${index * baseAngle} ${center} ${center})`}
					/>
					<text
						x={center}
						y={center}
						textAnchor="middle"
						alignmentBaseline="middle"
						transform={`rotate(-${index * baseAngle} 50 50)\
									translate(0, ${-(lineLen + 0.1) * center})\
									rotate(${index * baseAngle} 50 50)`}
						fontSize={settings.fontSize}
					>
						{name}
					</text>
				</g>
			))}

			{allLines
				.filter((dataSet) => dataSet.values.length === labels.length)
				.map((dataSetUser, index) => {
					const dataSet: graphDataSetDetails = Object.assign(
						JSON.parse(JSON.stringify(defaultData)),
						dataSetUser
					);
					return (
						<g key={index} id={`data-${dataSet.name}`}>
							{labels.map((name, id) => (
								<circle
									id={`point-${name}-${dataSet.name}`}
									key={id}
									r={dataSet.pointRadius}
									fill={dataSet.color}
									cx={center}
									cy={center}
									transform={`rotate(-${id * baseAngle} 50 50) translate(0, ${
										-(0.9 * lineLen * dataSet.values[id]) * center
									}) rotate(${id * baseAngle} 50 50)`}
								></circle>
							))}

							<polygon
								id={`fill-${dataSet.name}`}
								fillOpacity={dataSet.fillOpacity}
								fill={dataSet.color}
								stroke={dataSet.color}
								strokeWidth={dataSet.strokeWidth}
								points={labels
									.map((name) => {
										const pointPos = graphRef.current
											?.getElementById(`point-${name}-${dataSet.name}`)
											.getBoundingClientRect();
										const cx =
											(size * ((pointPos?.left ?? 0) + (pointPos?.width ?? 0) / 2 - svgX)) / svgW;
										const cy =
											(size * ((pointPos?.top ?? 0) + (pointPos?.height ?? 0) / 2 - svgY)) / svgH;
										return `${cx},${cy}`;
									})
									.join(" ")}
							/>
						</g>
					);
				})}
		</svg>
	);
};

export default RadarChart;
