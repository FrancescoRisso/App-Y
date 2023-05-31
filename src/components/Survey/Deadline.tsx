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
import { deadlineItemNames, graphFields, graphFieldsList } from "../../types";
import { getGraphFieldsZeroValues } from "../../util";
import { IonCard, IonCardContent, IonCol, IonGrid, IonRadio, IonRadioGroup, IonRow } from "@ionic/react";
import { AppContext } from "../AppContext";

interface choiceItem {
	name: deadlineItemNames;
	text: string;
	values: Record<graphFields, number>;
}

const Deadline = () => {
	const options: choiceItem[] = useMemo(
		() => [
			{
				name: "postpone",
				text: "Rimando",
				values: Object.assign(getGraphFieldsZeroValues(), { organization: -1, career: 0 })
			},
			{
				name: "organize&do",
				text: "Organizzo nel dettaglio e rispetto",
				values: Object.assign(getGraphFieldsZeroValues(), { organization: 3, career: 3 })
			},
			{
				name: "organize&notDo",
				text: "Organizzo... ma poi non faccio",
				values: Object.assign(getGraphFieldsZeroValues(), { organization: 1, career: -1 })
			},
			{
				name: "whichProject",
				text: "Progetto? Quale progetto?",
				values: Object.assign(getGraphFieldsZeroValues(), { organization: -2, career: -2 })
			},
			{
				name: "noPlan",
				text: "Non programmo, faccio ogni giorno un po'",
				values: Object.assign(getGraphFieldsZeroValues(), { organization: 1, career: 2 })
			}
		],
		[]
	);

	const allContext = useContext(AppContext);
	const context = useMemo(
		() => allContext.storedValues.weeklySurveyValues.deadline,
		[allContext.storedValues.weeklySurveyValues.deadline]
	);

	const min = useMemo(() => {
		const val = getGraphFieldsZeroValues();

		options.forEach((option) => {
			(graphFieldsList as unknown as graphFields[]).forEach((field) => {
				if (option.values[field] < 0) val[field] += option.values[field];
			});
		});

		return val;
	}, [options]);

	const max = useMemo(() => {
		const val = getGraphFieldsZeroValues();

		options.forEach((option) => {
			(graphFieldsList as unknown as graphFields[]).forEach((field) => {
				if (option.values[field] > 0) val[field] += option.values[field];
			});
		});

		return val;
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

export default Deadline;
