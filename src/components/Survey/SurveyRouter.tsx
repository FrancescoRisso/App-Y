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

import { graphFields, surveyPages } from "../../types";
import ShoppingList from "./ShoppingList";

export interface SurveyRouterProps {
	page: surveyPages;
	updateMinScores: (update: Record<graphFields, number>) => void;
	updateMaxScores: (update: Record<graphFields, number>) => void;
	updateScores: (update: Record<graphFields, number>) => void;
}

const SurveyRouter = ({ page, updateMaxScores, updateMinScores, updateScores }: SurveyRouterProps) => {
	switch (page) {
		case "alone?":
		case "deadline":
		case "hobbies":
		case "likeWhatYouDo":
		case "mirror":
		case "shoppingList":
		case "work":
		default:
			return <></>;
	}
};

export default SurveyRouter;
