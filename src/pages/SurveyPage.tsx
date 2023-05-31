import { useMemo, useState } from "react";
import { surveyPages } from "../types";
import { Redirect } from "react-router";
import Button from "../components/General_components/Button";
import SurveyRouter from "../components/Survey/SurveyRouter";
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

export interface SurveyPageProps {}

const SurveyPage = () => {
	// const [page, setPage] = useState<"start" | surveyPages | "end">("deadline");
	const [page, setPage] = useState<"start" | surveyPages | "end">("start");

	const nextPage = useMemo((): surveyPages | "end" => {
		switch (page) {
			case "start":
				return "shoppingList";
			case "shoppingList":
				return "mirror";
			case "mirror":
				return "deadline";
			case "deadline":
				return "hobbies";
			case "hobbies":
				return "work";
			case "work":
				return "alone?";
			case "alone?":
				return "likeWhatYouDo";
			case "likeWhatYouDo":
				return "end";
			default:
				return "end";
		}
	}, [page]);

	const title = useMemo(() => {
		switch (page) {
			case "alone?":
				return "Chi sei?";
			case "deadline":
				return "Hai un progetto con una scadenza a lungo termine, che fai?";
			case "hobbies":
				return "Ti piace questo hobby? Swipa dalla parte giusta.";
			case "likeWhatYouDo":
				return "Ti piace quello che fai nella vita?";
			case "mirror":
				return "Come ti vedi?";
			case "shoppingList":
				return "Fai la lista della spesa:";
			case "work":
				return "Come ti vedi in ambito lavorativo/universitario?";
			default:
				return "";
		}
	}, [page]);

	if (page === "end") {
		// add scores TODO
		return <Redirect to="/home" />;
	}

	if (page === "start") {
		setPage(nextPage);
		return <></>;
	}

	return (
		<div className="h-100-percent justify-content-vertically-space-outside">
			<h1 className="my-0 ion-text-center bold font-size-even-bigger">{title}</h1>

			<SurveyRouter page={page} />

			<Button
				color="white"
				fontSize="app"
				text="Avanti"
				action={() => {
					setPage(nextPage);
				}}
			/>
		</div>
	);
};

export default SurveyPage;
