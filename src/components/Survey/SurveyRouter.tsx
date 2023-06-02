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

import { surveyPages } from "../../types";
import Deadline from "./Deadline";
import Work from "./Work";
import ShoppingList from "./ShoppingList";

export interface SurveyRouterProps {
	page: surveyPages;
}

const SurveyRouter = ({ page }: SurveyRouterProps) => {
	switch (page) {
		case "alone?":
			return <></>;
		case "deadline":
			return <Deadline />;

		case "hobbies":
		case "likeWhatYouDo":
		case "mirror":
			return <></>;

		case "shoppingList":
			return <ShoppingList />;

		case "work":
			return <Work />;
		default:
			return <></>;
	}
};

export default SurveyRouter;
