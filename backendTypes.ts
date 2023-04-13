import { GenderLabels } from "./src/types";

export type ApiFunction<Params, Return> = (args: Params) => Promise<Return | null>;

export interface ServerServices {
	getAvatar: ApiFunction<getAvatarParams, getAvatarReturn>;
	getInfo: ApiFunction<getInfoParams, getInfoReturn>;
	login: ApiFunction<loginParams, loginReturn>;
}

// --------------------------------------------------------------------
// all types
export type AllApiTypes = "avatar" | "server_error" | "param_error" | "userInfo" | "login";

// --------------------------------------------------------------------
// getAvatar
export interface getAvatarParams {
	userID: string;
}

export type getAvatarReturn =
	| { type: "avatar"; isCustom: false } // no custom avatar
	| { type: "avatar"; isCustom: true; details: AvatarDetails }; // there is a custom avatar

// --------------------------------------------------------------------
// Avatar details
export type AvatarDetails = null; // TODO

// --------------------------------------------------------------------
// Common return values
export type CommonApiReturns =
	| { type: "server_error"; cause: string } // Something went wrong on the server
	| { type: "param_error"; cause: string } // Parameters were not correct
	| null;

// --------------------------------------------------------------------
// getInfo
export interface getInfoParams {
	userID: string;
	pwd: string; // In clear
}

export type getInfoReturn = {
	type: "userInfo";
	details: {
		Name: string;
		Surname: string;
		Sex: GenderLabels;
		BirthDate: string;
		Username: string;
	};
};

// --------------------------------------------------------------------
// login
export interface loginParams {
	username: string;
	pwd: string; // In clear
}

export type loginReturn =
	| {
			type: "login";
			correct: true;
			userId: number;
	  } // user-password are correct
	| { type: "login"; correct: false }; // invalid user and/or password
