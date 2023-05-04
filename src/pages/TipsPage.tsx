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

import { IonButton, IonCol, IonGrid, IonRow } from "@ionic/react";
import PandaImg from "../components/General_components/PandaImg";
import { tipsCategories } from "../types";
import { useMemo } from "react";
import { Link } from "react-router-dom";

export interface TipsPageProps {}

const TipsPage = () => {
	const categories = useMemo<[string, tipsCategories][]>(
		() => [
			["Sport", "sport"],
			["Salute", "health"],
			["Gestione del denaro", "money"],
			["Gestione del tempo", "timeManag"],
			["Istruzione", "education"],
			["Relazioni", "relationships"],
			["Viaggi", "travel"],
			["Tempo libero", "freeTime"]
		],
		[]
	);

	return (
		<IonGrid className="h-100-percent">
			<IonRow className="h-30-percent">
				<PandaImg type="confused" height="100%" />
			</IonRow>
			<IonRow className="h-10-percent ion-justify-content-end">
				<h1 className="ion-text-center w-100-percent no-vertical-margin center-vertically">
					Scegli una categoria
				</h1>
			</IonRow>
			<IonRow className="h-60-percent">
				<IonGrid className="h-100-percent justify-content-vertically ion-padding-bottom">
					{categories
						.filter((cat, index) => index !== categories.length - 1)
						.map((cat, index) => [cat, categories[index + 1]])
						.filter((cat, index) => index % 2 === 0)
						.map((row, index) => (
							<IonRow className="h-20-percent" key={index}>
								{row.map(([name, link], colIndex) => (
									<IonCol size="5" push={"1"} className="h-100-percent" key={link}>
										<Link to={`/tipsCategory/${link}`}>
											<IonButton
												color="main"
												className="no-caps w-100-percent ion-text-wrap h-100-percent h-100-percent button-font-larger"
											>
												{name}
											</IonButton>
										</Link>
									</IonCol>
								))}
							</IonRow>
						))}
				</IonGrid>
			</IonRow>
		</IonGrid>
	);
};

export default TipsPage;
