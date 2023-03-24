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

import { IonGrid, IonRow, IonCol, IonItem, IonList, IonRadioGroup, IonLabel, IonRadio, IonCard } from "@ionic/react";
import { useCallback, useContext, useEffect } from "react";

import { GenderLabels, RegisterComponentProps } from "../../types";

import SpeechBubble from "../General_components/SpeechBubble";
import { RegisterContext } from "./Common/RegisterContext";

import PandaImg from "../General_components/PandaImg";

const Gender = ({ canProceed, setCanProceed }: RegisterComponentProps) => {
	const context = useContext(RegisterContext);

	const inputChanged = useCallback((val: GenderLabels | "") => {
		if (val !== "") {
			if (!canProceed) setCanProceed(true);
		} else if (canProceed) setCanProceed(false);
	}, [canProceed, setCanProceed]);

	useEffect(() => {
		inputChanged(context.gender.val);
	}, [context.gender, inputChanged]);

	return (
		<IonGrid className="h-100percent">
			<IonRow className="h-100percent ion-align-items-center">
				<IonCol>
					<form>
						<IonCard>
							<IonList className="mx-10px">
								<IonRadioGroup
									onIonChange={(event) => {
										inputChanged(event.detail.value);
										context.gender.set(event.detail.value);
									}}
									value={context.gender.val}
								>
									<IonItem>
										<IonLabel>Uomo</IonLabel>
										<IonRadio color="main" value="male"></IonRadio>
									</IonItem>

									<IonItem>
										<IonLabel>Donna</IonLabel>
										<IonRadio color="main" value="female"></IonRadio>
									</IonItem>

									<IonItem>
										<IonLabel>Altro</IonLabel>
										<IonRadio color="main" value="other"></IonRadio>
									</IonItem>
								</IonRadioGroup>
							</IonList>
						</IonCard>
					</form>

					<br />

					<SpeechBubble content={<p>Come ti identifichi?</p>} />
					<PandaImg type="bamboo" />
				</IonCol>
			</IonRow>
		</IonGrid>
	);
};

export default Gender;

/*

description:
	Happy asks you your birthdate
	
state:
	
hooks:
	
context:
	- RegisterContext

*/
