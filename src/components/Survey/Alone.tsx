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
import { aloneItemNames, graphFields, graphFieldsList } from "../../types";
import { getGraphFieldsZeroValues } from "../../util";
import { IonCard, IonCardContent, IonCol, IonGrid, IonRow } from "@ionic/react";
import { AppContext } from "../AppContext";
import sadAlone from "../../images/survey/sadAlone.svg";
import happyAlone from "../../images/survey/happyAlone.svg";
import happyTogether from "../../images/survey/happyTogether.svg";
import sadTogether from "../../images/survey/sadTogether.svg";

interface choiceItem {
	name: aloneItemNames;
	image: string;
	values: Record<graphFields, number>;
}

const Alone = () => {
	const options: choiceItem[] = useMemo(
		() => [
			{
				name: "sadAlone",
				image: sadAlone,
				values: Object.assign(getGraphFieldsZeroValues(), { relationships: -1, selfcare: -1, health: -1 })
			},
			{
				name: "sadTogether",
				image: sadTogether,
				values: Object.assign(getGraphFieldsZeroValues(), { relationships: 0, selfcare: -1, health: -1 })
			},
			{
				name: "happyAlone",
				image: happyAlone,
				values: Object.assign(getGraphFieldsZeroValues(), { relationships: -1, selfcare: +2, health: +1 })
			},
			{
				name: "happyTogether",
				image: happyTogether,
				values: Object.assign(getGraphFieldsZeroValues(), { relationships: +2, selfcare: +1, health: +1 })
			}
		],
		[]
	);

	const allContext = useContext(AppContext);
	const context = useMemo(
		() => allContext.storedValues.weeklySurveyValues.alone,
		[allContext.storedValues.weeklySurveyValues.alone]
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
							{Array.from({ length: numCols }).map((_, colNo) => {
								const option = options[rowNo * numCols + colNo];
								return (
									<IonCol key={colNo}>
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
							})}
						</IonRow>
					))}
				</IonGrid>
			</IonCardContent>
		</IonCard>
	);
};

export default Alone;
