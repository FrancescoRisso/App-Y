import { GenderLabels } from "./src/types";
export type ApiFunction<ParamTypes, ReturnType> = (ParamTypes) => ReturnType;

export interface ServerServices {
	getAvatar: (getAvatarParams) => getAvatarReturn | CommonApiReturns;
	getInfo: (getInfoParams) => getInfoReturn | CommonApiReturns;
}


// --------------------------------------------------------------------
// getAvatar
export interface getAvatarParams {
	userID: string;
}

export type getAvatarReturn =
	| { type: "default" } // no custom avatar
	| { type: "custom"; details: AvatarDetails }; // there is a custom avatar


// --------------------------------------------------------------------
// Avatar details
export type AvatarDetails = null; // TODO


// --------------------------------------------------------------------
// Common return values
export type CommonApiReturns =
	| "err" // Something went wrong on the server
	| null; // Parameters were not correct


// --------------------------------------------------------------------
// getInfo
export interface getInfoParams {
	userID: string;
	pwd: string; // In clear
}

export type getInfoReturn = {
	Name: string;
	Surname: string;
	Sex: GenderLabels;
	BirthDate: string;
	Username: string;
};
