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
import { appColors, pandaTypes } from "../../types";
import PandaImg from "./PandaImg";
import { Redirect } from "react-router";
import { IonIcon } from "@ionic/react";
import { arrowBackCircleOutline } from "ionicons/icons";

export interface TopPageTongueProps {
	text?: string;
	panda?: pandaTypes;
	color: appColors;
	height?: number | string;
	width?: number | string;
	type: "tongue" | "cloud-center";
	prevPage?: string;
}

const TopPageTongue = ({ text, panda, color, height, type, width, prevPage }: TopPageTongueProps) => {
	const radius = useMemo(() => "61px", []);

	const [redirect, setRedirect] = useState<boolean>(false);
	const [svgHeight, setSvgHeight] = useState<number>(0);

	const svgRef = useRef<SVGSVGElement>(null);

	const updateHeight = useCallback(() => {
		console.debug("Here");
		const h = svgRef.current?.getBoundingClientRect().height ?? 0;
		if (h !== 0) setSvgHeight(h);
		else setTimeout(updateHeight, 1);
	}, []);

	useEffect(updateHeight, [svgRef.current?.getBoundingClientRect(), updateHeight]);

	const content = useMemo(
		() => (
			<div className="h-100-percent">
				{prevPage && (
					<IonIcon
						className="back-icon-in-tongue"
						icon={arrowBackCircleOutline}
						onClick={() => {
							setRedirect(true);
						}}
					/>
				)}
				<div className="center-vertically">
					{text && <h1 className="ion-text-center no-vertical-margin font-title">{text}</h1>}
					<br />
					{panda && <PandaImg type={panda} width="50%" />}
				</div>
			</div>
		),
		[panda, text, prevPage]
	);

	if (redirect && prevPage) return <Redirect to={prevPage} />;

	switch (type) {
		case "tongue":
			return (
				<div
					style={{
						borderBottomRightRadius: radius,
						borderBottomLeftRadius: radius,
						height: height ?? "auto",
						width: width ?? "auto",
						backgroundColor: `var(--ion-color-${color})`,
						color: `var(--ion-color-${color}-contrast)`
					}}
				>
					{content}
				</div>
			);

		case "cloud-center":
			return (
				<div style={{ color: `var(--ion-color-${color}-contrast)` }}>
					{/* Same as the file cloudsCenter.svg, but with custom styling and colors */}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 390 325"
						fill="none"
						style={{
							height: height ?? "auto",
							width: width ?? "auto"
						}}
						ref={svgRef}
					>
						<path
							d="M356.711 27.2333C356.711 168.747 252.458 283.467 123.856 283.467C-4.74702 283.467 -109 168.747 -109 27.2333C-109 -114.28 -4.74702 -229 123.856 -229C252.458 -229 356.711 -114.28 356.711 27.2333Z"
							fill={`var(--ion-color-${color})`}
						/>
						<ellipse
							cx="257.239"
							cy="99.4675"
							rx="204.762"
							ry="225.532"
							fill={`var(--ion-color-${color})`}
						/>
					</svg>

					<div
						style={{
							position: "absolute",
							top: 0,
							height: svgHeight,
							width: "100%"
						}}
					>
						<div className="center-vertically h-100-percent">{content}</div>
					</div>
				</div>
			);
	}
};

export default TopPageTongue;
