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

import { IonCard, IonCardContent, IonCheckbox, IonCol, IonGrid, IonRow } from "@ionic/react";
import { useCallback, useMemo, useContext, useEffect } from "react";
import { graphFields, graphFieldsList, shoppingItemNames } from "../../types";

import champagne from "../../images/survey/champagne.png";
import chips from "../../images/survey/chips.png";
import coke from "../../images/survey/coke.png";
import donut from "../../images/survey/donut.png";
import lattuce from "../../images/survey/lattuce.png";
import pasta from "../../images/survey/pasta.png";
import steak from "../../images/survey/steak.png";
import strawberry from "../../images/survey/strawberry.png";

import { getGraphFieldsZeroValues } from "../../util";
import { AppContext } from "../AppContext";

interface shoppingItem {
	name: shoppingItemNames;
	icon: string;
	values: Record<graphFields, number>;
}

const ShoppingList = () => {
	const options: shoppingItem[] = useMemo(
		() => [
			{
				name: "champagne",
				icon: champagne,
				values: Object.assign(getGraphFieldsZeroValues(), { health: -1 })
			},
			{
				name: "chips",
				icon: chips,
				values: Object.assign(getGraphFieldsZeroValues(), { health: -1 })
			},
			{
				name: "coke",
				icon: coke,
				values: Object.assign(getGraphFieldsZeroValues(), { health: -1 })
			},
			{
				name: "donut",
				icon: donut,
				values: Object.assign(getGraphFieldsZeroValues(), { health: -1 })
			},
			{
				name: "lattuce",
				icon: lattuce,
				values: Object.assign(getGraphFieldsZeroValues(), { health: 1 })
			},
			{
				name: "pasta",
				icon: pasta,
				values: Object.assign(getGraphFieldsZeroValues(), { health: 1 })
			},
			{
				name: "steak",
				icon: steak,
				values: Object.assign(getGraphFieldsZeroValues(), { health: 0 })
			},
			{
				name: "strawberry",
				icon: strawberry,
				values: Object.assign(getGraphFieldsZeroValues(), { health: 1 })
			}
		],
		[]
	);

	const allContext = useContext(AppContext);
	const context = useMemo(
		() => allContext.storedValues.weeklySurveyValues.shoppingList,
		[allContext.storedValues.weeklySurveyValues.shoppingList]
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

	const cur = useMemo(() => {
		const val = getGraphFieldsZeroValues();

		context.selected.val.forEach((optionName) => {
			const option = options.filter((opt) => opt.name === optionName)[0];
			(graphFieldsList as unknown as graphFields[]).forEach((field) => {
				val[field] += option.values[field];
			});
		});

		return val;
	}, [context.selected.val, options]);

	const addItem = useCallback(
		(item: shoppingItem) => {
			context.selected.set([...context.selected.val, item.name]);
		},
		[context, cur, max, min]
	);

	const removeItem = useCallback(
		(item: shoppingItem) => {
			context.selected.set(context.selected.val.filter((i) => i !== item.name));
		},
		[context]
	);

	useEffect(() => {
		context.values.set({ min, max, cur });
	}, [min, max, cur, context.values.set]);

	// const getOptionByName = useCallback((name: string) => options.filter((opt) => opt.name === name)[0], []);

	const numCols = useMemo(() => 2, []);

	return (
		<IonCard color="white" className="mx-5">
			<IonCardContent>
				<IonGrid>
					{Array.from({ length: Math.ceil(options.length / numCols) }).map((_, rowNo) => (
						<IonRow key={rowNo}>
							{Array.from({ length: numCols }).map((_, colNo) => {
								const item = options[rowNo * numCols + colNo];
								const checked = context.selected.val.filter((sel) => sel === item.name).length > 0;
								return (
									<IonCol
										key={colNo}
										onClick={() => {
											if (checked) removeItem(item);
											else addItem(item);
										}}
										className="ion-text-center pos-relative"
									>
										<IonGrid className="p-0 h-100-percent">
											<IonRow className="h-100-percent">
												<IonCol size="3">
													<IonCheckbox
														checked={checked}
														className="center-vertically big-checkbox violet-checkbox"
													/>
												</IonCol>
												<IonCol size="9">
													<img
														style={{ maxHeight: "100%" }}
														src={item.icon}
														alt=""
														className="center-vertically"
													/>
												</IonCol>
											</IonRow>
										</IonGrid>
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

export default ShoppingList;
