/*

description:
	
	
state:
	- 
	
hooks:
	- 
	
context:
	- 
	
imported into:
	- 
	
component dependences:
	- 
	
other dependences:
	- 
	
*/

import React from "react";
import { RegisterContextStructure, RegisterPageLabels } from "../../types";
import { useState } from "react";

export const RegisterContext = React.createContext({} as RegisterContextStructure);

export interface RegisterContextProps {
	// The element tree that will consume the context
	child: JSX.Element;
}

const RegisterContextProvider = ({ child }: RegisterContextProps) => {
	const [name, setName] = useState<string>("");
	const [surname, setSurname] = useState<string>("");
	const [step, setStep] = useState<number>(0);

	const componentSequence: RegisterPageLabels[] = ["welcome", "nameAndSurname"];
	const componentAlwaysOk: boolean[] = [true, false];

	return (
		<RegisterContext.Provider
			value={{
				totSteps: componentSequence.length,
				stepNo: { val: step, set: setStep },

				components: componentSequence,
				componentAlwaysOk,

				name: { val: name, set: setName },
				surname: { val: surname, set: setSurname }
			}}
		>
			{child}
		</RegisterContext.Provider>
	);
};

export default RegisterContextProvider;
