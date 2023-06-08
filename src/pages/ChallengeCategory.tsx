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

import {
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardTitle,
	IonCol,
	IonGrid,
	IonIcon,
	IonProgressBar,
	IonRow
} from "@ionic/react";
import { ormons } from "../types";
import { getOrmonName } from "../util";
import { happyOutline } from "ionicons/icons";
import Button from "../components/General_components/Button";
import { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../components/AppContext";

export interface ChallengeCategoryProps {
	category: ormons;
}

const ChallengeCategory = ({ category }: ChallengeCategoryProps) => {
	const [active, setActive] = useState<boolean>(false);
	const [completed, setCompleted] = useState<boolean>(false);
	const totTime = useMemo(() => 60, []);
	const [remainingTime, setRemainingTime] = useState<number>(totTime);

	useEffect(() => {
		const update = async () => {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setRemainingTime(remainingTime - 1);
		};
		if (active && remainingTime !== 0) update();
	}, [active, remainingTime]);

	const context = useContext(AppContext);

	if (active)
		return (
			<div className="py-4 center-vertically">
				<IonCard className="my-0 mx-5 py-5" color="white">
					<IonCardHeader>
						<IonCardTitle>Challenge: sorridi</IonCardTitle>
					</IonCardHeader>
					<IonCardContent>
						<div className="ion-text-center">
							<IonIcon icon={happyOutline} style={{ fontSize: "10vh" }} />
						</div>
						<div className="mt-3"></div>

						<p className="font-size-app ion-text-center">
							<b>Tempo rimasto:</b> {remainingTime} sec
						</p>

						<IonProgressBar value={remainingTime / totTime} color="violet" />

						<IonGrid className="mt-4">
							<IonRow>
								<IonCol>
									<Button
										color="danger"
										fontSize="app"
										text="Basta"
										action={() => {
											setActive(false);
											setRemainingTime(0);
										}}
										shorter
									/>
								</IonCol>
								<IonCol>
									<Button
										color="success"
										fontSize="app"
										text="Fatto"
										action={() => {
											setActive(false);
											setRemainingTime(0);
											setCompleted(true);
											context.storedValues.challengeCompleted.set(true);
										}}
										shorter
									/>
								</IonCol>
							</IonRow>
						</IonGrid>
					</IonCardContent>
				</IonCard>
			</div>
		);

	switch (category) {
		case "endorphin":
			return (
				<div className="py-4">
					{!completed && (
						<IonCard className="my-0 mx-5" color="white">
							<IonCardHeader>
								<IonCardTitle>Challenge: sorridi</IonCardTitle>
							</IonCardHeader>
							<IonCardContent>
								<div className="ion-text-center">
									<IonIcon icon={happyOutline} style={{ fontSize: "10vh" }} />
								</div>
								<div className="mt-3"></div>
								<p className="font-size-app">
									<b>Tempo:</b> 1 minuto
								</p>
								<div className="mt-3"></div>
								<p className="font-size-app">
									<b>Istruzioni:</b> fai un bel sorriso sincero
								</p>
								<div className="mt-4">
									<Button
										color="night"
										fontSize="app"
										text="Inizia"
										action={() => {
											setActive(true);
											setRemainingTime(totTime);
										}}
									/>
								</div>
							</IonCardContent>
						</IonCard>
					)}
					<IonCard className="mt-5 mx-5" color="white">
						<IonCardHeader>
							<IonCardTitle>Altre challenge arriveranno presto...</IonCardTitle>
						</IonCardHeader>
					</IonCard>
				</div>
			);

		default:
			return (
				<h1 className="mt-0 pt-5 ion-text-center">
					Hai già raggiunto il livello massimo di {getOrmonName(category).toLowerCase()}
				</h1>
			);
	}
};

export default ChallengeCategory;
