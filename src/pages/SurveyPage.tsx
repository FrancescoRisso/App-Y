import { useCallback, useMemo, useState } from "react";
import { graphFields, surveyPages } from "../types";
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

	const zeros = useMemo((): Record<graphFields, number> => {
		return {
			career: 0,
			health: 0,
			organization: 0,
			passion: 0,
			relationships: 0,
			selfcare: 0
		};
	}, []);

	const [minScores, setMinScores] = useState<Record<graphFields, number>>(JSON.parse(JSON.stringify(zeros)));
	const [maxScores, setMaxScores] = useState<Record<graphFields, number>>(JSON.parse(JSON.stringify(zeros)));
	const [scores, setScores] = useState<Record<graphFields, number>>(JSON.parse(JSON.stringify(zeros)));

	const updateScores = useCallback(
		(curVal: Record<graphFields, number>, setVal: (val: Record<graphFields, number>) => void) => {
			return (update: Record<graphFields, number>) => {
				setVal(
					Object.fromEntries(
						Object.entries(curVal).map(([key, val]) => [key, val + update[key as graphFields]])
					) as Record<graphFields, number>
				);
			};
		},
		[]
	);

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

			<SurveyRouter
				page={page}
				updateMaxScores={updateScores(maxScores, setMaxScores)}
				updateMinScores={updateScores(minScores, setMinScores)}
				updateScores={updateScores(scores, setScores)}
			/>

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
