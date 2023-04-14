/*

description:
	Happy asks you name and surname
	
state:
	
hooks:
	
context:
	- RegisterContext
	
*/

import { useContext, useEffect, useState } from "react";
import { IonGrid, IonRow, IonCol, IonInput, IonItem, IonText, IonIcon } from "@ionic/react";

import { RegisterComponentProps } from "../../types";

import SpeechBubble from "../General_components/SpeechBubble";
import { RegisterContext } from "./Common/RegisterContext";

import PandaImg from "../General_components/PandaImg";
import API from "../../api";

import { closeOutline, checkmarkOutline } from "ionicons/icons";

const Username = ({ canProceed, setCanProceed }: RegisterComponentProps) => {
	const context = useContext(RegisterContext);

	const [username, setUsername] = useState<string>("");
	const [isValid, setIsValid] = useState<boolean | null>(null);

	useEffect(() => {
		context.updateValidities.single(context.username.val, canProceed, setCanProceed);
	}, [context.username, context.updateValidities, canProceed, setCanProceed]);

	return (
		<IonGrid className="h-100percent">
			<IonRow className="h-100percent ion-align-items-center">
				<IonCol>
					<IonItem className="mx-10px" fill="outline" color="main">
						<IonInput
							type="text"
							placeholder="Nome"
							value={username}
							onInput={async (e) => {
								const input = e.currentTarget.value?.toString() ?? "";
								setUsername(input);

								const apiResponse = await API.isUsernameTaken({ username: input });

								setIsValid(!apiResponse?.isUsed);
								if (apiResponse?.isUsed) context.username.set("");
								else context.username.set(input);
							}}
						/>
					</IonItem>
					<IonText className="mx-10px">
						{isValid === null ? <></> : <IonIcon icon={isValid ? checkmarkOutline : closeOutline} />}
						<small>
							{isValid === null
								? ""
								: isValid
								? "Sembra che questo username sia ancora libero"
								: "Mi spiace, questo username è già usato"}
						</small>
					</IonText>

					<br />

					<SpeechBubble
						content={<p>Come ultima cosa, scegli uno username che ti identifichi univocamente nell'app</p>}
					/>
					<div className="ion-margin-top ion-padding" />
					<PandaImg type="relaxed" />
				</IonCol>
			</IonRow>
		</IonGrid>
	);
};

export default Username;
