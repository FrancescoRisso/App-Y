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
import { useContext } from "react";
import moment from "moment";

import { RegisterComponentProps } from "../../types";

import SpeechBubble from "../General_components/SpeechBubble";
import { RegisterContext } from "./Common/RegisterContext";

import wavingPanda from "../../images/tmp/wavingPanda.png";

const Gender = ({ canProceed, setCanProceed }: RegisterComponentProps) => {
	const context = useContext(RegisterContext);

	return (
		<IonGrid className="h-100percent">
			<IonRow className="h-100percent ion-align-items-center">
				<IonCol>
					<form>
						<IonCard>
							<IonList className="mx-10px">
								<IonRadioGroup
									onIonChange={(event) => {
										context.gender.set(event.detail.value);

										if (event.detail.value !== "") {
											if (!canProceed) setCanProceed(true);
										} else if (canProceed) setCanProceed(false);
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
					<img src={wavingPanda} alt="Panda che saluta" />
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
