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

import TopPageTongue from "../components/General_components/TopPageTongue";
import tipsSvgs from "../images/tips/tipsSvgs";
import { tipCategoryName, tipsCategories } from "../types";

import SVG from "react-inlinesvg";

export interface TipsCategoryPageProps {
	category: tipsCategories;
}

const TipsCategoryPage = ({ category }: TipsCategoryPageProps) => {
	return (
		<>
			<TopPageTongue
				color="violet"
				type="cloud-center"
				text={tipCategoryName(category)}
				width="100%"
				prevPage="/tips"
			/>
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
