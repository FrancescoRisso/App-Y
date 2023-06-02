import { useContext, useMemo, useState } from "react";
import { graphFields, graphFieldsList, surveyPages } from "../types";
import { Redirect } from "react-router";
import Button from "../components/General_components/Button";
import SurveyRouter from "../components/Survey/SurveyRouter";
import { getGraphFieldsZeroValues } from "../util";
import { AppContext } from "../components/AppContext";
import API from "../api";
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
	// const [page, setPage] = useState<"start" | surveyPages | "end">("likeWhatYouDo");
	const [page, setPage] = useState<"start" | surveyPages | "end" | "redirect">("start");

	const allContext = useContext(AppContext);
	const context = useMemo(
		() => allContext.storedValues.weeklySurveyValues,
		[allContext.storedValues.weeklySurveyValues]
	);

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
		const finalScores: Record<graphFields, number> = Object.assign(
			getGraphFieldsZeroValues(),
			Object.fromEntries(
				graphFieldsList.map((field) => {
					let minTot = 0,
						maxTot = 0,
						valTot = 0;

					Object.entries(context).forEach(([pageName, pageChoice]) => {
						minTot += pageChoice.values.val.min[field];
						maxTot += pageChoice.values.val.max[field];
						valTot += pageChoice.values.val.cur[field];
					});

					const res = maxTot - minTot === 0 ? 0 : (valTot - minTot) / (maxTot - minTot);

					return [field, res];
				})
			)
		);

		const f = async () => {
			await API.setScores({
				userID: await allContext.storage.getValue("userID"),
				scores: finalScores
			});
			allContext.storedValues.userScores.set(finalScores);
			setPage("redirect");
		};
		f();
		return <></>;
	}
	if (page === "redirect") {
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
