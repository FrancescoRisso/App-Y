/*

description:
	Happy asks you your birthdate
	
state:
	
hooks:
	
context:
	- RegisterContext

*/

import { IonGrid, IonRow, IonCol, IonItem, IonInput } from "@ionic/react";
import { useContext, useEffect } from "react";
import moment from "moment";

import { RegisterComponentProps } from "../../types";

import SpeechBubble from "../General_components/SpeechBubble";
import { RegisterContext } from "./Common/RegisterContext";

import PandaImg from "../General_components/PandaImg";

const BirthDate = ({ canProceed, setCanProceed }: RegisterComponentProps) => {
	const context = useContext(RegisterContext);

	useEffect(() => {
		context.updateValidities.single(context.birthDate.val.format("YYYY-MM-DD"), canProceed, setCanProceed);
	}, [canProceed, setCanProceed, context.birthDate, context.updateValidities]);

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
								pattern="DD/MM/YYYY"
								onInput={(event: React.FormEvent<HTMLIonInputElement>) => {
									context.birthDate.set(moment(event.currentTarget.value?.toString() ?? ""));
									context.updateValidities.single(
										event.currentTarget.value?.toString() ?? "",
										canProceed,
										setCanProceed
									);
								}}
							/>
						</IonItem>
					</form>

					<br />

					<SpeechBubble content={<p>Quando sei nat{context.getGenderString("o", "a", "*")}?</p>} />
					<PandaImg type="computer" />
				</IonCol>
			</IonRow>
		</IonGrid>
	);
};

export default BirthDate;
