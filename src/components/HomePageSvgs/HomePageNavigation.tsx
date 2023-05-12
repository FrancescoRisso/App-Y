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

import { useState } from "react";
import { svgLinks } from "../../types";
import SvgWithlink from "./SvgWithlink";
import { Redirect } from "react-router";

export interface HomePageNavigationProps {}

const HomePageNavigation = () => {
	const [redirTo, setRedirTo] = useState<svgLinks | null>(null);

	if (redirTo === null)
		return (
			<>
				<svg
					viewBox="0 0 820 720"
					width="100%"
					overflow="hidden"
					version="1.1"
					xmlSpace="preserve"
					xmlns="http://www.w3.org/2000/svg"
				>
					<defs>
						<clipPath id="clipPath1255">
							<rect
								x="680.5"
								y="799.9"
								width="149.93"
								height="110.42"
								rx=".37973"
								ry=".030466"
								fill="#2f1061"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="12.094"
							/>
						</clipPath>
						<clipPath id="clipPath2205">
							<rect
								x="571.87"
								y="-176.86"
								width="133.77"
								height="238.8"
								rx=".37973"
								ry=".030466"
								fill="#2f1061"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="12.094"
							/>
						</clipPath>
						<clipPath id="clipPath2592">
							<rect
								x="254.96"
								y="764.89"
								width="125.69"
								height="231.62"
								rx=".37973"
								ry=".030466"
								fill="#fff"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="12.094"
							/>
						</clipPath>
					</defs>
					<g transform="translate(-229.86 .015577)">
						{["challenge", "diary", "goals", "trend", "friends", "tips"].map((name) => (
							<SvgWithlink
								key={name}
								name={name as svgLinks}
								clickAction={() => {
									setRedirTo(name as svgLinks);
								}}
							/>
						))}
					</g>
				</svg>
			</>
		);

	return <Redirect to={`/${redirTo}`} />;
};

export default HomePageNavigation;
