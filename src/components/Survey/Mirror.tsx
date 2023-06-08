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
import { IonCard, IonCardContent, IonCol, IonGrid, IonRadio, IonRadioGroup, IonRow } from "@ionic/react";
import { AppContext } from "../AppContext";

interface choiceItem {
	name: mirrorItemNames;
	text: string;
	values: Record<graphFields, number>;
}

const Mirror = () => {
	const options: choiceItem[] = useMemo(
		() => [
			{
				name: "negative",
				text: "Come un bicchiere mezzo vuoto",
				values: Object.assign(getGraphFieldsZeroValues(), { selfcare: -1 })
			},
			{
				name: "neutral",
				text: "Come un bicchiere riempito a metà",
				values: Object.assign(getGraphFieldsZeroValues(), { selfcare: +2 })
			},
			{
				name: "negative",
				text: "Come un bicchiere mezzo pieno",
				values: Object.assign(getGraphFieldsZeroValues(), { selfcare: 0 })
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

	return (
		<IonCard color="white" className="mx-5 h-60-percent">
			<IonCardContent className="h-100-percent">
				<IonGrid class="h-100-percent">
					{options.map((opt, index) => (
						<IonRow
							key={index}
							onClick={() => {
								context.selected.set(opt.name);
								context.values.set({ min, max, cur: opt.values });
							}}
							style={{ height: `calc(100% / ${options.length})` }}
						>
							<IonCol size="2" className="mb-2">
								<IonRadioGroup value={context.selected.val === opt.name}>
									<IonRadio
										value={true}
										className={`diary-radio diary-radio-violet center-vertically`}
									/>
								</IonRadioGroup>
							</IonCol>
							<IonCol>
								<p className="font-size-app my-0 center-vertically">{opt.text}</p>
							</IonCol>
						</IonRow>
					))}
				</IonGrid>
			</IonCardContent>
		</IonCard>
	);
};

export default Mirror;
