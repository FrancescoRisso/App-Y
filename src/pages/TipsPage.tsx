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

import { IonCol, IonGrid, IonRow } from "@ionic/react";
import PandaImg from "../components/General_components/PandaImg";
import { tipCategoryName, tipsCategories, tipsCategoriesList } from "../types";
import { useMemo } from "react";
import Button from "../components/General_components/Button";

export interface TipsPageProps {}

const TipsPage = () => {
	const categories = useMemo<[string, tipsCategories][]>(
		() => tipsCategoriesList.map((cat) => [tipCategoryName(cat), cat]),
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
										<Button
											color="white-violet-text"
											text={name}
											link={`/tipsCategory/${link}`}
											fontSize="app"
											noMargin
										/>
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
