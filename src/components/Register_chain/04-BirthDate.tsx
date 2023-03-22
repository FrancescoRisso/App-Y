/*

description:
	Happy asks you your birthdate
	
state:
	
hooks:
	
context:
	- RegisterContext

*/

import { IonGrid, IonRow, IonCol, IonItem, IonInput } from "@ionic/react";
import { useContext } from "react";
import moment from "moment";

import { RegisterComponentProps } from "../../types";

import SpeechBubble from "../General_components/SpeechBubble";
import { RegisterContext } from "./Common/RegisterContext";

import wavingPanda from "../../images/tmp/wavingPanda.png";

const BirthDate = ({ canProceed, setCanProceed }: RegisterComponentProps) => {
	const context = useContext(RegisterContext);

	return (
		<IonGrid className="h-100percent">
			<IonRow className="h-100percent ion-align-items-center">
				<IonCol>
					<form>
						<IonItem className="mx-10px" fill="outline" color="main">
							<IonInput
								type="date"
								placeholder="Data di nascita"
								value={context.birthDate.val.format("YYYY-MM-DD")}
								max={moment().format("YYYY-MM-DD")}
								onInput={(event: React.FormEvent<HTMLIonInputElement>) => {
									context.birthDate.set(moment(event.currentTarget.value?.toString() ?? ""));

									if (event.currentTarget.value?.toString() !== "") {
										if (!canProceed) setCanProceed(true);
									} else if (canProceed) setCanProceed(false);
								}}
							/>
						</IonItem>
					</form>

					<br />

					<SpeechBubble content={<p>Quando sei nato?</p>} />
					<img src={wavingPanda} alt="Panda che saluta" />
				</IonCol>
			</IonRow>
		</IonGrid>
	);
};

export default BirthDate;
