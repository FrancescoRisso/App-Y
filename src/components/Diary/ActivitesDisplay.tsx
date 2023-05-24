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

import { IonAlert, IonCol, IonGrid, IonRow } from "@ionic/react";
import { appColors, diaryActivities } from "../../types";
import { useCallback, useContext, useMemo, useState } from "react";
import SingleActivity from "./SingleActivity";
import { AppContext } from "../AppContext";

export interface ActivitesDisplayProps {
	activities: diaryActivities[];
	disabled?: boolean;
	mainColor: appColors;
	title: string;
}

const ActivitesDisplay = ({ activities, disabled, mainColor, title }: ActivitesDisplayProps) => {
	const context = useContext(AppContext);

	const numCols = useMemo(() => 3, []);
	const numRows = useMemo(() => Math.floor((1.0 * activities.length) / numCols), [activities, numCols]);

	const [selected, setSelected] = useState<diaryActivities[]>([]);
	const addToSelected = useCallback(
		(activity: diaryActivities) => setSelected([...selected, activity]),
		[selected, setSelected]
	);
	const removeFromSelected = useCallback(
		(activity: diaryActivities) => setSelected([...selected.filter((x) => x !== activity)]),
		[selected, setSelected]
	);

	const [popupVisible, setPopupVisible] = useState<boolean>(false);

	return (
		<>
			<p className="font-size-bigger ion-text-center mb-2 mt-5">{title}</p>
			<IonAlert
				isOpen={popupVisible}
				message={`Non puoi cambiare obbiettivi a metà strada... sii coerente con te stess${context.getGenderTerminations()}`}
				buttons={["OK"]}
				onDidDismiss={() => setPopupVisible(false)}
			></IonAlert>
			<IonGrid>
				{Array.from({ length: numRows }, (x, i) => i).map((rowNo) => (
					<IonRow key={rowNo} className="my-4">
						{Array.from({ length: numCols }, (x, i) => i).map((colNo) => {
							const activity = activities[rowNo * numCols + colNo];
							return (
								<IonCol key={colNo} className="mx-2">
									{activity && (
										<SingleActivity
											activity={activity}
											invertSelection={() => {
												disabled
													? setPopupVisible(true)
													: selected.includes(activity)
													? removeFromSelected(activity)
													: addToSelected(activity);
											}}
											mainColor={mainColor}
											selected={selected.includes(activity)}
										/>
									)}
								</IonCol>
							);
						})}
					</IonRow>
				))}
			</IonGrid>
		</>
	);
};

export default ActivitesDisplay;
