/*

description:
	Renders the common part of the registration
	
state:
	
hooks:
	- useEffect(): every time a new step is reached, increment the step counter
	
context:
	- 
	
imported into:
	- 
	
component dependences:
	- 
	
other dependences:
	- 
	
*/

import { IonContent, IonGrid, IonProgressBar } from "@ionic/react";

import { useContext, useState, useEffect } from "react";
import { RegisterContext } from "../RegisterContext";
import Header from "../../General_components/Header";
import RegisterFooter from "./RegisterFooter";
import RegisterRouter from "./RegisterRouter";

export interface CommonProps {}

const Common = () => {
	const context = useContext(RegisterContext);

	const [canProceed, setCanProceed] = useState<boolean>(context.componentAlwaysOk[context.stepNo.val]);

	useEffect(() => {
		console.debug(`setCanProceed ${context.componentAlwaysOk[context.stepNo.val]} - useEffect`);
		setCanProceed(context.componentAlwaysOk[context.stepNo.val]);
	}, [context.stepNo]);

	return (
		<>
			<Header
				title="Registrati"
				displayBackButton={context.stepNo.val !== 0}
				onBackAction={() => {
					context.stepNo.set(context.stepNo.val - 1);
					// console.debug("setCanProceed true - header going back");
					// setCanProceed(true);
				}}
			/>

			<IonContent color="main">
				<IonGrid className="ion-margin-top ion-margin-bottom w-90percent">
					<IonProgressBar value={(context.stepNo.val + 1) / (context.totSteps + 1)} color="light" />
				</IonGrid>

				<RegisterRouter
					pageName={context.components[context.stepNo.val]}
					canProceed={canProceed}
					setCanProceed={setCanProceed}
				/>
			</IonContent>

			<RegisterFooter
				nextPageEnabled={canProceed}
				nextClickAction={() => {
					// setCanProceed(context.componentAlwaysOk[context.stepNo.val + 1]);
					// console.debug(
					// 	`setCanProceed ${context.componentAlwaysOk[context.stepNo.val + 1]} - footer going forward`
					// );
					context.stepNo.set(context.stepNo.val + 1);
				}}
			/>
		</>
	);
};

export default Common;
