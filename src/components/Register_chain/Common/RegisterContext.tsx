/*

description:
	Holds all the common values needed for the registration phase
	
state:
	- name: the first name of the user
	- surname: the last name of the user
	- step: the number of the login step the user is currently doing
	- gender: the gender of the user
	- birthDate: the birth date of the user (as moment() object)
	
hooks:
	
context:
	
*/

import React, { useState } from "react";
import moment from "moment";

import { GenderLabels, RegisterContextStructure, RegisterPageLabels } from "../../../types";

export const RegisterContext = React.createContext({} as RegisterContextStructure);

export interface RegisterContextProps {
	// The element tree that will consume the context
	child: JSX.Element;
}

const RegisterContextProvider = ({ child }: RegisterContextProps) => {
	const [name, setName] = useState<string>("");
	const [surname, setSurname] = useState<string>("");
	const [step, setStep] = useState<number>(0);
	const [birthDate, setBirthDate] = useState<moment.Moment>(moment(""));
	const [gender, setGender] = useState<GenderLabels | "">("");

	const getGenderString = (male: string, female: string, other: string) => {
		switch (gender) {
			case "male":
				return male;
			case "female":
				return female;
			case "other":
				return other;
			default:
				return male;
		}
	};

	const updateValiditySingle = (value: string, canProceed: boolean, setCanProceed: (val: boolean) => void) => {
		if (value !== "") {
			if (!canProceed) setCanProceed(true);
		} else if (canProceed) setCanProceed(false);
	};

	const updateValidityDouble = (
		val1: string,
		val2: string,
		mustBeEqual: boolean,
		canProceed: boolean,
		setCanProceed: (val: boolean) => void
	) => {
		if (val1 !== "" && val2 !== "" && (!mustBeEqual || val1 === val2)) {
			if (!canProceed) setCanProceed(true);
		} else if (canProceed) setCanProceed(false);
	};

	const componentSequence: RegisterPageLabels[] = ["welcome", "nameAndSurname", "gender", "birthdate"];
	const componentAlwaysOk: boolean[] = [true, false, false, false];

	// const componentSequence: RegisterPageLabels[] = ["gender"];
	// const componentAlwaysOk: boolean[] = [false];

	return (
		<RegisterContext.Provider
			value={{
				totSteps: componentSequence.length,
				stepNo: { val: step, set: setStep },

				components: componentSequence,
				componentAlwaysOk,

				name: { val: name, set: setName },
				surname: { val: surname, set: setSurname },
				gender: { val: gender, set: setGender },
				birthDate: { val: birthDate, set: setBirthDate },

				getGenderString,

				updateValidities: {
					single: updateValiditySingle,
					double: updateValidityDouble
				}
			}}
		>
			{child}
		</RegisterContext.Provider>
	);
};

export default RegisterContextProvider;
