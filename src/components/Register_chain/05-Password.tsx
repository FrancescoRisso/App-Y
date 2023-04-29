/*

description:
	Happy asks you to choose a password
	
state:
	
hooks:
	
context:
	- RegisterContext
	
*/

import { useContext, useEffect } from "react";
import { IonGrid, IonRow, IonCol, IonInput, IonItem } from "@ionic/react";

import { RegisterComponentProps } from "../../types";

import SpeechBubble from "../General_components/SpeechBubble";
import { RegisterContext } from "./Common/RegisterContext";

import PandaImg from "../General_components/PandaImg";
import ValidityTooltip from "../General_components/ValidityTooltip";

const Password = ({ canProceed, setCanProceed }: RegisterComponentProps) => {
	const context = useContext(RegisterContext);

	const getInputChangeEventListerner = (field: "password" | "passwordConfirm") => {
		return (event: React.FormEvent<HTMLIonInputElement>) => {
			const otherField = field === "password" ? "passwordConfirm" : "password";

			context[field].set(event.currentTarget.value?.toString() ?? "");

			context.updateValidities.double(
				context[otherField].val,
				event.currentTarget.value?.toString() ?? "",
				true,
				canProceed,
				setCanProceed
			);
		};
	};

	useEffect(() => {
		context.updateValidities.double(
			context.password.val,
			context.passwordConfirm.val,
			true,
			canProceed,
			setCanProceed
		);
	}, [context.password, context.passwordConfirm, context.updateValidities, canProceed, setCanProceed]);

	return (
		<IonGrid className="h-100percent">
			<IonRow className="h-100percent ion-align-items-center">
				<IonCol>
					<form>
						<IonItem className="mx-10px" fill="outline" color="main">
							<IonInput
								type="password"
								placeholder="Pasword"
								value={context.password.val}
								onInput={getInputChangeEventListerner("password")}
							/>
						</IonItem>

						<br />

						<IonItem className="mx-10px" fill="outline" color="main">
							<IonInput
								type="password"
								placeholder="Conferma password"
								value={context.passwordConfirm.val}
								onInput={getInputChangeEventListerner("passwordConfirm")}
							/>
						</IonItem>
					</form>

					<ValidityTooltip
						isPresent={context.password.val !== "" && context.passwordConfirm.val !== ""}
						isValid={context.password.val === context.passwordConfirm.val}
						validMessage="Le password coincidono"
						errorMessage="Le password non coincidono"
					/>
					<br />

					<SpeechBubble content={<p>Scegli una password sicura per proteggere il tuo account</p>} />
					<PandaImg width="80%" type="computer" />
				</IonCol>
			</IonRow>
		</IonGrid>
	);
};

export default Password;
