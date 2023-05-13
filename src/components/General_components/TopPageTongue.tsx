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

import { useMemo } from "react";
import { appColors, pandaTypes } from "../../types";
import PandaImg from "./PandaImg";

export interface TopPageTongueProps {
	text?: string;
	panda?: pandaTypes;
	color: appColors;
	height?: number | string;
}

const TopPageTongue = ({ text, panda, color, height }: TopPageTongueProps) => {
	const radius = useMemo(() => "61px", []);

	return (
		<div
			style={{
				borderBottomRightRadius: radius,
				borderBottomLeftRadius: radius,
				height: height ?? "auto",
				backgroundColor: `var(--ion-color-${color})`,
				color: `var(--ion-color-${color}-contrast)`
			}}
		>
			<div className="center-vertically">
				{text && <h1 className="ion-text-center no-vertical-margin font-title">{text}</h1>}
				<br />
				{panda && <PandaImg type={panda} width="50%" />}
			</div>
		</div>
	);
};

export default TopPageTongue;
