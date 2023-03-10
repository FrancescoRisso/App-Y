/*

description:
	An input field
	
state:
	
hooks:
	
context:
	
*/

import { IonInput, IonItem, IonLabel } from "@ionic/react";

export interface InputProps {
	// the type of input that should go inside
	type: "password" | "text";

	// a reference that will be set to this input to retreive its value
	reference: React.RefObject<HTMLIonInputElement>;

	// the text that should be inserted as input label
	label: string;
}

const Input = ({ type, reference, label }: InputProps) => {
	return (
		<IonItem fill="outline" color="success">
			<IonLabel position="stacked">{label}</IonLabel>
			<IonInput ref={reference} type={type === "password" ? "password" : "text"}></IonInput>
		</IonItem>
	);
};

export default Input;
