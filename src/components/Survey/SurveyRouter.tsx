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
import LikeWhatYouDo from "./LikeWhatYouDo";
import Alone from "./Alone";
import Hobby from "./Hobby";
import Mirror from "./Mirror";

export interface SurveyRouterProps {
	page: surveyPages;
}

const SurveyRouter = ({ page }: SurveyRouterProps) => {
	switch (page) {
		case "alone?":
			return <Alone />;

		case "deadline":
			return <Deadline />;

		case "hobbies":
			return <Hobby />;

		case "likeWhatYouDo":
			return <LikeWhatYouDo />;

		case "mirror":
			return <Mirror />;

		case "shoppingList":
			return <ShoppingList />;

		case "work":
			return <Work />;

		default:
			return <></>;
	}
};

export default SurveyRouter;
