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

import tipsSvgs from "../images/tips/tipsSvgs";
import { tipsCategories } from "../types";

import SVG from "react-inlinesvg";

export interface TipsCategoryPageProps {
	category: tipsCategories;
}

const TipsCategoryPage = ({ category }: TipsCategoryPageProps) => {
	return (
		<>
			{tipsSvgs(category).map((img, index) =>
				img.startsWith("<svg") ? (
					<SVG src={img} className="my-3 center-horizontally" width="85%" key={index} />
				) : (
					<img src={img} alt="" className="my-3 center-horizontally" width="85%" key={index} />
				)
			)}
		</>
	);
};

export default TipsCategoryPage;
