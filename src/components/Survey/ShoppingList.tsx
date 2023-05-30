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
import { useCallback, useMemo, useState, useEffect } from "react";
import { SurveyItemProps, graphFields, graphFieldsList } from "../../types";

import champagne from "../../images/survey/champagne.png";
import chips from "../../images/survey/chips.png";
import coke from "../../images/survey/coke.png";
import donut from "../../images/survey/donut.png";
import lattuce from "../../images/survey/lattuce.png";
import pasta from "../../images/survey/pasta.png";
import steak from "../../images/survey/steak.png";
import strawberry from "../../images/survey/strawberry.png";

import { getGraphFieldsZeroValues } from "../../util";

interface shoppingItem {
	name: "champagne" | "chips" | "coke" | "donut" | "lattuce" | "pasta" | "steak" | "strawberry";
	icon: string;
	values: Record<graphFields, number>;
}

const ShoppingList = ({ updateMaxScores, updateMinScores, updateScores }: SurveyItemProps) => {
	const options: shoppingItem[] = useMemo(
		() => [
			{
				name: "champagne",
				icon: champagne,
				values: Object.assign(getGraphFieldsZeroValues(), { health: 1 })
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

	const [selected, setSelected] = useState<shoppingItem[]>([]);

	const addItem = useCallback(
		(item: shoppingItem) => {
			const copy: typeof selected = JSON.parse(JSON.stringify(selected));
			copy.push(item);
			// if (selected.length === 3) copy.shift();
			setSelected(copy);
		},
		[selected]
	);

	const removeItem = useCallback(
		(item: shoppingItem) => {
			setSelected(selected.filter((i) => i !== item));
		},
		[selected]
	);

	const numCols = useMemo(() => 2, []);

	useEffect(() => {
		const minScores = getGraphFieldsZeroValues();
		const maxScores = getGraphFieldsZeroValues();

		options.forEach((option) => {
			(graphFieldsList as unknown as graphFields[]).forEach((field) => {
				if (option.values[field] < 0) minScores[field] += option.values[field];
				else maxScores[field] += option.values[field];
			});
		});

		updateMaxScores(maxScores);
		updateMinScores(minScores);
		//eslint-disable-next-line
	}, []);

	useEffect(() => {
		const score = getGraphFieldsZeroValues();

		selected.forEach((option) => {
			(graphFieldsList as unknown as graphFields[]).forEach((field) => {
				score[field] += option.values[field];
			});
		});

		updateScores(score);
	}, [selected, updateScores]);

	return (
		<IonCard color="white" className="mx-5">
			<IonCardContent>
				<IonGrid>
					{Array.from({ length: Math.ceil(options.length / numCols) }).map((_, rowNo) => (
						<IonRow key={rowNo}>
							{Array.from({ length: numCols }).map((_, colNo) => {
								const item = options[rowNo * numCols + colNo];
								const checked = selected.filter((sel) => sel.name === item.name).length > 0;
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
