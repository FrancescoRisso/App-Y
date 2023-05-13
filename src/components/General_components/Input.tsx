/*

description:
	An input field
	
state:
	
hooks:
	- useMemo inputType: computes the HTML input type from type
	
context:
	
*/

import { IonInput, IonItem, IonNote } from "@ionic/react";

export interface InputProps {
	// the type of input that should go inside
	type: "password" | "text" | "email" | "date";

	// what to do when the input value changes
	onInputAction: (e: React.FormEvent<HTMLIonInputElement>) => void;

	// the text that should be inserted as input label
	label: string;

	// If present, displays an error string
	error?: string;

	// The current content of the input
	value: string;
}

const Input = ({ type, onInputAction, label, error, value }: InputProps) => {
	return (
		<IonItem
			color="grey"
			shape="round"
			className={`pill font-size-app item-horizontal-margin pill-height-normal ${error && "ion-invalid"}`}
			lines="none"
		>
			{/* <IonLabel position="stacked">{label}</IonLabel> */}
			<IonInput
				onInput={(e) => {
					onInputAction(e);
				}}
				type={type}
				value={value}
				placeholder={label}
				className="pill-height-normal ion-margin-start"
			></IonInput>
			{error && <IonNote slot="error">{error}</IonNote>}
		</IonItem>
	);
};

export default Input;
