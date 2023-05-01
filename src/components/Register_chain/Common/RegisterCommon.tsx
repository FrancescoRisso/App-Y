/*

description:
	Renders the common part of the registration
	
state:
	- fwdEnabled: whether the "Next page" button should be enabled
	- fwdOverride: whether fwdEnabled was set by the page being correct	

hooks:
	- useEffect(): every time a new step is reached, update the default fwdEnabled for that page
		The "every time a new step is reached" means a render is executed, and fwdEnable has the default value
	
context:
	- RegisterContext
	
*/

import { IonContent, IonGrid, IonProgressBar } from "@ionic/react";

import { useContext, useState, useEffect } from "react";

import { RegisterContext } from "./RegisterContext";
import Header from "../../General_components/Header";
import RegisterFooter from "./RegisterFooter";
import RegisterRouter from "./RegisterRouter";

export interface CommonProps {}

const Common = () => {
	const context = useContext(RegisterContext);

	const [fwdEnabled, setFwdEnabled] = useState<boolean>(context.componentAlwaysOk[context.stepNo.val]);
	const [fwdOverride, setFwdOverride] = useState<boolean>(false);

	useEffect(() => {
		if (!fwdOverride) setFwdEnabled(context.componentAlwaysOk[context.stepNo.val]);
	}, [context.stepNo, context.componentAlwaysOk, fwdOverride]);

	return (
		<>
			<Header
				title="Registrati"
				displayBackButton={context.stepNo.val !== 0}
				onBackAction={() => {
					context.stepNo.set(context.stepNo.val - 1);
					setFwdEnabled(true);
					setFwdOverride(true);
				}}
			/>

			<IonContent color="main-light">
				<IonGrid className="h-5-percent w-90percent">
					<IonProgressBar value={(context.stepNo.val + 1) / (context.totSteps + 1)} color="light" className="center-vertically" />
				</IonGrid>

				<div className="h-95-percent">
					<RegisterRouter
						pageName={context.components[context.stepNo.val]}
						canProceed={fwdEnabled}
						setCanProceed={(val) => {
							setFwdOverride(true);
							setFwdEnabled(val);
						}}
					/>
				</div>
			</IonContent>

			<RegisterFooter
				nextPageEnabled={fwdEnabled}
				nextClickAction={() => {
					setFwdOverride(false);
					context.stepNo.set(context.stepNo.val + 1);
				}}
				isLastPage={context.stepNo.val === context.totSteps - 1}
			/>
		</>
	);
};

export default Common;
