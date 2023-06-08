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

import { useContext, useMemo } from "react";
import { graphFields, graphFieldsList, mirrorItemNames } from "../../types";
import { getGraphFieldsZeroValues } from "../../util";
import { IonCard, IonCardContent, IonCol, IonGrid, IonRow } from "@ionic/react";
import { AppContext } from "../AppContext";

import mirroPositive from "../../images/survey/mirrorPositive.svg";
import mirroNegative from "../../images/survey/mirrorNegative.svg";
import mirroNeutral from "../../images/survey/mirrorNeutral.svg";

interface choiceItem {
	name: mirrorItemNames;
	image: string;
	values: Record<graphFields, number>;
}

const Mirror = () => {
	const options: choiceItem[] = useMemo(
		() => [
			{
				name: "negative",
				image: mirroNegative,
				values: Object.assign(getGraphFieldsZeroValues(), { selfcare: -1 })
			},
			{
				name: "positive",
				image: mirroPositive,
				values: Object.assign(getGraphFieldsZeroValues(), { selfcare: 0 })
			},
			{
				name: "neutral",
				image: mirroNeutral,
				values: Object.assign(getGraphFieldsZeroValues(), { selfcare: +2 })
			}
		],
		[]
	);

	const allContext = useContext(AppContext);
	const context = useMemo(
		() => allContext.storedValues.weeklySurveyValues.mirror,
		[allContext.storedValues.weeklySurveyValues.mirror]
	);

	const min: Record<graphFields, number> = useMemo(() => {
		return Object.assign(
			getGraphFieldsZeroValues(),
			Object.fromEntries(
				graphFieldsList.map((field) => [field, Math.min(...options.map((opt) => opt.values[field]))])
			)
		);
	}, [options]);

	const max = useMemo(() => {
		return Object.assign(
			getGraphFieldsZeroValues(),
			Object.fromEntries(
				graphFieldsList.map((field) => [field, Math.max(...options.map((opt) => opt.values[field]))])
			)
		);
	}, [options]);

	const numCols = useMemo(() => 2, []);

	return (
		<IonCard color="white" className="mx-5 h-60-percent">
			<IonCardContent className="h-100-percent p-0">
				<IonGrid class="h-100-percent">
					{Array.from({ length: Math.ceil(options.length / numCols) }).map((_, rowNo) => (
						<IonRow key={rowNo} className="h-50-percent">
							{Array.from({ length: Math.min(numCols, options.length - rowNo * numCols) }).map(
								(_, colNo, row) => {
									const option = options[rowNo * numCols + colNo];
									return (
										<IonCol
											key={colNo}
											size={`${12 / numCols}`}
											push={`${((numCols - row.length) * 6) / numCols}`}
										>
											<img
												src={option.image}
												alt=""
												className={`with-shadow${
													context.selected.val === option.name ? "-green" : ""
												} rounded`}
												onClick={() => {
													context.selected.set(option.name);
													context.values.set({ min, max, cur: option.values });
												}}
											/>
										</IonCol>
									);
								}
							)}
						</IonRow>
					))}
				</IonGrid>
			</IonCardContent>
		</IonCard>
	);
};

export default Mirror;
