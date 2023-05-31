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
import Deadline from "./Deadline";
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
			return <></>;
		case "deadline":
			return (
				<Deadline
					updateMaxScores={updateMaxScores}
					updateMinScores={updateMinScores}
					updateScores={updateScores}
				/>
			);

		case "hobbies":
		case "likeWhatYouDo":
		case "mirror":
			return <></>;

		case "shoppingList":
			return (
				<ShoppingList
					updateMaxScores={updateMaxScores}
					updateMinScores={updateMinScores}
					updateScores={updateScores}
				/>
			);

		case "work":
		default:
			return <></>;
	}
};

export default SurveyRouter;
