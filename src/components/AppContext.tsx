/*

description:
	Holds all the common values needed for the app
	
state:

hooks:
	
context:
	
*/

import React, { useState } from "react";

import { AppContextStructure, avatarSpecs, userSpecs } from "../types";
import useStorage from "../hooks/useStorage";

export const AppContext = React.createContext({} as AppContextStructure);

export interface AppContextProps {
	// The element tree that will consume the context
	child: JSX.Element;
}

const AppContextProvider = ({ child }: AppContextProps) => {
	const storage = useStorage();

	const [userDetails, setUserDetails] = useState<userSpecs | "notLoaded">("notLoaded");
	const [avatar, setAvatar] = useState<avatarSpecs>("notLoaded");

	return (
		<AppContext.Provider
			value={{
				storage,
				storedValues: {
					userDetails: { val: userDetails, set: setUserDetails },
					userAvatar: { val: avatar, set: setAvatar }
				}
			}}
		>
			{child}
		</AppContext.Provider>
	);
};

export default AppContextProvider;
