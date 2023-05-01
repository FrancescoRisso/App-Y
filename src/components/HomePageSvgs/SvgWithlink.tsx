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

import { useRef } from "react";
import { svgLinks } from "../../types";
import { Link } from "react-router-dom";
import HomePageSvgs from "./HomePageSvgDefs";

export interface SvgWithlinkProps {
	name: svgLinks;
	clickAction: (dest: svgLinks) => void;
}

const SvgWithlink = ({ name, clickAction }: SvgWithlinkProps) => {
	const ref = useRef<HTMLAnchorElement>(null);

	return (
		<>
			<Link to={`/${name}`} ref={ref} />
			<g
				onClick={() => {
					clickAction(name);
				}}
			>
				<HomePageSvgs name={name} />
			</g>
		</>
	);
};

export default SvgWithlink;
