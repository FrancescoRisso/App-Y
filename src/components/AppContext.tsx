/*

description:
	Holds all the common values needed for the app
	
state:

hooks:
	
context:
	
*/

import React, { useCallback, useState } from "react";

import {
	AppContextStructure,
	avatarSpecs,
	deadlineItemNames,
	diaryActivities,
	graphFields,
	graphFieldsMinMaxVal,
	workItemNames,
	shoppingItemNames,
	userSpecs,
	goalType
} from "../types";
import useStorage from "../hooks/useStorage";
import API from "../api";
import moment from "moment";
import { getDefaultGoals, getGraphFieldsZeroValues } from "../util";

export const AppContext = React.createContext({} as AppContextStructure);

export interface AppContextProps {
	// The element tree that will consume the context
	child: JSX.Element;
}

const AppContextProvider = ({ child }: AppContextProps) => {
	const storage = useStorage();

	const [userDetails, setUserDetails] = useState<userSpecs | "notLoaded">("notLoaded");
	const [avatar, setAvatar] = useState<avatarSpecs>("notLoaded");
	const [activities, setActivities] = useState<"notLoaded" | "notSelected" | diaryActivities[]>("notLoaded");
	const [userScores, setUserScores] = useState<"none" | "notLoaded" | Record<graphFields, number>>("notLoaded");

	// Values for the survey
	const [shoppingValues, setShoppingValues] = useState<graphFieldsMinMaxVal>({
		min: getGraphFieldsZeroValues(),
		max: getGraphFieldsZeroValues(),
		cur: getGraphFieldsZeroValues()
	});
	const [deadlineValues, setDeadlineValues] = useState<graphFieldsMinMaxVal>({
		min: getGraphFieldsZeroValues(),
		max: getGraphFieldsZeroValues(),
		cur: getGraphFieldsZeroValues()
	});
	const [workValues, setWorkValues] = useState<graphFieldsMinMaxVal>({
		min: getGraphFieldsZeroValues(),
		max: getGraphFieldsZeroValues(),
		cur: getGraphFieldsZeroValues()
	});
	const [likeWhatYouDoValues, setLikeWhatYouDoValues] = useState<graphFieldsMinMaxVal>({
		min: getGraphFieldsZeroValues(),
		max: getGraphFieldsZeroValues(),
		cur: getGraphFieldsZeroValues()
	});

	// Selected for the survey
	const [shoppingSel, setShoppingSel] = useState<shoppingItemNames[]>([]);
	const [deadlineSel, setDeadlineSel] = useState<deadlineItemNames | null>(null);
	const [workSel, setWorkSel] = useState<workItemNames | null>(null);
	const [likeWhatYouDoSel, setLikeWhatYouDoSel] = useState<number>(50);

	// goals
	const [goals, setGoals] = useState<goalType[]>(getDefaultGoals());

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

	const loadActivities = useCallback(async () => {
		if (activities === "notLoaded" && storage.isOk) {
			const val = await API.getActivities({ userID: await storage.getValue("userID") });

			if (val) setActivities(val.activities);
		}
	}, [storage, activities]);

	const loadUserScores = useCallback(async () => {
		if (userScores === "notLoaded" && storage.isOk) {
			const val = await API.getScores({ userID: await storage.getValue("userID") });

			if (val) setUserScores(val.scores);
		}
	}, [storage, userScores]);

	const getGenderString = (male: string, female: string, other: string) => {
		if (userDetails !== "notLoaded")
			switch (userDetails.gender) {
				case "male":
					return male;
				case "female":
					return female;
				case "other":
					return other;
				default:
					return male;
			}
		return other;
	};

	return (
		<AppContext.Provider
			value={{
				storage,
				storedValues: {
					userDetails: { val: userDetails, set: setUserDetails },
					userAvatar: { val: avatar, set: setAvatar },
					activities: { val: activities, set: setActivities },
					userScores: { val: userScores, set: setUserScores },
					weeklySurveyValues: {
						shoppingList: {
							values: { val: shoppingValues, set: setShoppingValues },
							selected: { val: shoppingSel, set: setShoppingSel }
						},
						deadline: {
							values: { val: deadlineValues, set: setDeadlineValues },
							selected: { val: deadlineSel, set: setDeadlineSel }
						},
						work: {
							values: { val: workValues, set: setWorkValues },
							selected: { val: workSel, set: setWorkSel }
						},
						likeWhatYouDo: {
							values: { val: likeWhatYouDoValues, set: setLikeWhatYouDoValues },
							selected: { val: likeWhatYouDoSel, set: setLikeWhatYouDoSel }
						}
					},
					goals: { val: goals, set: setGoals }
				},
				loaders: {
					loadAvatar: updateAvatar,
					loadUserDetails: updateUserDetails,
					loadActivities: loadActivities,
					loadScores: loadUserScores
				},
				clearUserData,
				getGenderString,
				getGenderTerminations: () => getGenderString("o", "a", "*")
			}}
		>
			{child}
		</AppContext.Provider>
	);
};

export default AppContextProvider;
