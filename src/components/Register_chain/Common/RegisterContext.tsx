/*

description:
	Holds all the common values needed for the registration phase
	
state:
	- name: the first name of the user
	- surname: the last name of the user
	- step: the number of the login step the user is currently doing
	
hooks:
	
context:
	
*/

import React, { useState } from "react";
import moment from "moment";

import { RegisterContextStructure, RegisterPageLabels } from "../../../types";

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

	const componentSequence: RegisterPageLabels[] = ["welcome", "nameAndSurname", "birthdate"];
	const componentAlwaysOk: boolean[] = [true, false, false];

	// const componentSequence: RegisterPageLabels[] = ["birthdate"];
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
				birthDate: { val: birthDate, set: setBirthDate }
			}}
		>
			{child}
		</RegisterContext.Provider>
	);
};

export default RegisterContextProvider;
