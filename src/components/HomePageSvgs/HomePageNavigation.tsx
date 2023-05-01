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
