/*

description:
	An input field
	
state:
	
hooks:
	- useMemo inputType: computes the HTML input type from type
	
context:
	
*/

import { IonInput, IonItem, IonSelect, IonSelectOption } from "@ionic/react";
import { useState } from "react";

export interface InputProps {
	// the type of input that should go inside
	type: "password" | "text" | "email" | "date";

	// what to do when the input value changes
	onInputAction: (val: string) => void;

	// the text that should be inserted as input label
	label: string;

	// If present, displays an error string
	error?: string;

	// The current content of the input
	value: string;

	options?: { val: string; name: string }[];
}

const Input = ({ type, onInputAction, label, error, value, options }: InputProps) => {
	return (
		<div>
			<IonItem
				color="grey"
				shape="round"
				className={`pill font-size-app item-horizontal-margin pill-height-normal ${error && "ion-invalid"}`}
				lines="none"
			>
				{options ? (
					<IonSelect
						className="pill-height-normal ion-margin-start w-90-percent"
						value={value}
						placeholder={label}
						onIonChange={(e) => {
							onInputAction(e.detail.value);
						}}
					>
						{options.map(({ val, name }) => (
							<IonSelectOption key={val} value={val}>
								{name}
							</IonSelectOption>
						))}
					</IonSelect>
				) : (
					<IonInput
						onInput={(e) => {
							onInputAction(e.currentTarget.value?.toString() ?? "");
						}}
						type={type}
						value={value}
						placeholder={label}
						className="pill-height-normal ion-margin-start"
					></IonInput>
				)}
			</IonItem>
			{error && <p className="font-size-app my-0 px-5 dark-grey-text">{error}</p>}
		</div>
	);
};

export default Input;
