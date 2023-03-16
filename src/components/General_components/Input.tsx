/*

description:
	An input field
	
state:
	
hooks:
	- useMemo inputType: computes the HTML input type from type
	
context:
	
*/

import { IonInput, IonItem, IonLabel, IonNote } from "@ionic/react";
import { useMemo } from "react";

export interface InputProps {
	// the type of input that should go inside
	type: "password" | "text" | "email" | "date";

	// a reference that will be set to this input to retreive its value
	reference: React.RefObject<HTMLIonInputElement>;

	// the text that should be inserted as input label
	label: string;

	// If present, displays an error string
	error?: string;

	// If an action should be done when the input loses focus
	loseFocusAction?: () => void;
}

const Input = ({ type, reference, label, error, loseFocusAction }: InputProps) => {
	const inputType = useMemo(() => {
		switch (type) {
			case "email":
				return "email";
			case "password":
				return "password";
			case "date":
				return "date";
			default:
				return "text";
		}
	}, [type]);

	return (
		<IonItem fill="outline" color="main" className={`${error && "ion-invalid"}`}>
			<IonLabel position="stacked">{label}</IonLabel>
			<IonInput ref={reference} type={inputType} onIonBlur={loseFocusAction}></IonInput>
			{error && <IonNote slot="error">{error}</IonNote>}
		</IonItem>
	);
};

export default Input;
