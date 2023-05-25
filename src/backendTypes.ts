import { GenderLabels, avatarSpecs, diaryActivities, graphFields } from "./types";

export type ApiFunction<Params, Return> = (args: Params) => Promise<Return | null>;

export interface ServerServices {
	getAvatar: ApiFunction<Id, getAvatarReturn>;
	getInfo: ApiFunction<IdPass, getInfoReturn>;
	login: ApiFunction<usernamePass, loginReturn>;
	isUsernameTaken: ApiFunction<username, isUsernameTakenReturn>;
	register: ApiFunction<registerParams, registerReturn>;
	getActivities: ApiFunction<Id, getActivitiesReturn>;
	setActivities: ApiFunction<IdPwdActivities, doneReturn>;
	getScores: ApiFunction<Id, getScoresReturn>;
}

// --------------------------------------------------------------------
// all types
export type AllApiTypes =
	| "avatar"
	| "server_error"
	| "param_error"
	| "userInfo"
	| "login"
	| "usernameCheck"
	| "register"
	| "activitiesSelected"
	| "done"
	| "scores";

export interface Id {
	userID: string;
}

export type getAvatarReturn =
	| { type: "avatar"; isCustom: false } // no custom avatar
	| { type: "avatar"; isCustom: true; details: avatarSpecs }; // there is a custom avatar

// --------------------------------------------------------------------
// Common return values
export type CommonApiReturns =
	| { type: "server_error"; cause: string } // Something went wrong on the server
	| { type: "param_error"; cause: string } // Parameters were not correct
	| null;

export interface IdPass {
	userID: string;
	pwd: string; // In clear
}

export interface usernamePass {
	username: string;
	pwd: string; // In clear
}

export type getInfoReturn = {
	type: "userInfo";
	details: {
		Name: string;
		Surname: string;
		Sex: GenderLabels;
		Birthdate: string;
		Username: string;
	};
};

export type loginReturn =
	| {
			type: "login";
			correct: true;
			userId: number;
	  } // user-password are correct
	| { type: "login"; correct: false }; // invalid user and/or password

// --------------------------------------------------------------------
// login
export interface registerParams {
	name: string;
	surname: string;
	sex: GenderLabels;
	birthdate: string;
	username: string;
	pwd: string; // In clear
}

export type registerReturn =
	| {
			type: "register";
			correct: true;
			userId: number;
	  } // username is valid
	| { type: "register"; correct: false }; // username is already chosen

// --------------------------------------------------------------------
// isUsernameTaken
export interface username {
	username: string;
}

export type isUsernameTakenReturn = {
	type: "usernameCheck";
	isUsed: boolean;
};

export type getActivitiesReturn = { type: "activitiesSelected"; activities: diaryActivities[] | "notSelected" };

export type doneReturn = { type: "done" };

export type IdPwdActivities = { userID: string; activities: diaryActivities[] };

export type getScoresReturn = { type: "scores"; scores: "none" | Record<graphFields, number> };
