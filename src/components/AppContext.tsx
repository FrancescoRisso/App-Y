/*

description:
	Holds all the common values needed for the app
	
state:

hooks:
	
context:
	
*/

import React from "react";

import { AppContextStructure } from "../types";
import useStorage from "../hooks/useStorage";

export const AppContext = React.createContext({} as AppContextStructure);

export interface AppContextProps {
	// The element tree that will consume the context
	child: JSX.Element;
}

const AppContextProvider = ({ child }: AppContextProps) => {
	const storage = useStorage();

	return (
		<AppContext.Provider
			value={{
				storage
			}}
		>
			{child}
		</AppContext.Provider>
	);
};

export default AppContextProvider;
