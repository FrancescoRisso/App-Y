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

import { useContext, useEffect } from "react";
import { AppContext } from "../components/AppContext";
import { IonCard, IonCardContent } from "@ionic/react";
import { graphFields, graphFieldsList } from "../types";

import RadarChart from "../components/General_components/RadarChart";
import { graphFieldsNames } from "../util";

export interface TrendPageProps {}

const TrendPage = () => {
	const context = useContext(AppContext);

	useEffect(() => {
		context.loaders.loadScores();
	}, [context.loaders]);

	return (
		<IonCard color="grey" className="my-0">
			<IonCardContent>
				{context.storedValues.userScores.val === "none" ? (
					<p></p>
				) : context.storedValues.userScores.val === "notLoaded" ? (
					<></>
				) : (
					<RadarChart
						data={[
							{
								values: (graphFieldsList as unknown as graphFields[]).map((field) =>
									typeof context.storedValues.userScores.val === "string"
										? 0
										: context.storedValues.userScores.val[field]
								),
								name: "prova",
								strokeWidth: 0.7,
								color: "var(--ion-color-violet)"
							}
						]}
						labels={(graphFieldsList as unknown as graphFields[]).map((field) => graphFieldsNames[field])}
						options={{
							strokeColor: "grey",
							fontSize: 5
						}}
					/>
				)}
			</IonCardContent>
		</IonCard>
	);
};

export default TrendPage;
