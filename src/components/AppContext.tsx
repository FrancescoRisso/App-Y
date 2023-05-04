/*

description:
	Holds all the common values needed for the app
	
state:

hooks:
	
context:
	
*/

import React, { useCallback, useState } from "react";

import { AppContextStructure, avatarSpecs, userSpecs } from "../types";
import useStorage from "../hooks/useStorage";
import API from "../api";
import moment from "moment";

export const AppContext = React.createContext({} as AppContextStructure);

export interface AppContextProps {
	// The element tree that will consume the context
	child: JSX.Element;
}

const AppContextProvider = ({ child }: AppContextProps) => {
	const storage = useStorage();

	const [userDetails, setUserDetails] = useState<userSpecs | "notLoaded">("notLoaded");
	const [avatar, setAvatar] = useState<avatarSpecs>("notLoaded");

	const clearUserData = useCallback(() => {
		setUserDetails("notLoaded");
		setAvatar("notLoaded");
	}, []);

	const updateAvatar = useCallback(async () => {
		if (avatar === "notLoaded" && storage.isOk) {
			const avatar = await API.getAvatar({ userID: await storage.getValue("userID") });

			if (avatar) {
				if (avatar.isCustom) {
					if (avatar.details) setAvatar(avatar.details);
				} else setAvatar("default");
			}
		}
	}, [avatar, storage]);

	const updateUserDetails = useCallback(async () => {
		if (userDetails === "notLoaded" && storage.isOk) {
			const userDetails = await API.getInfo({
				userID: await storage.getValue("userID"),
				pwd: await storage.getValue("pwd")
			});

			if (userDetails)
				setUserDetails({
					birthDate: moment(userDetails.details.Birthdate, "yyyy-MM-DD"),
					gender: userDetails.details.Sex,
					name: userDetails.details.Name,
					surname: userDetails.details.Surname,
					username: userDetails.details.Username
				});
		}
	}, [storage, userDetails]);

	return (
		<AppContext.Provider
			value={{
				storage,
				storedValues: {
					userDetails: { val: userDetails, set: setUserDetails },
					userAvatar: { val: avatar, set: setAvatar }
				},
				loaders: {
					loadAvatar: updateAvatar,
					loadUserDetails: updateUserDetails
				},
				clearUserData
			}}
		>
			{child}
		</AppContext.Provider>
	);
};

export default AppContextProvider;
