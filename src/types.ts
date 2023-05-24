import * as moment from "moment";

export interface StateVariable<type> {
	val: type;
	set: (newVal: type) => void;
}

export type RegisterComponent = (props: RegisterComponentProps) => JSX.Element;

export interface RegisterContextStructure {
	totSteps: number;

	stepNo: StateVariable<number>;
	components: RegisterPageLabels[];
	componentAlwaysOk: boolean[];
	// components: JSX.Element[];

	name: StateVariable<string>;
	surname: StateVariable<string>;
	gender: StateVariable<GenderLabels | "">;
	birthDate: StateVariable<moment.Moment>;
	password: StateVariable<string>;
	passwordConfirm: StateVariable<string>;
	username: StateVariable<string>;

	getGenderString: (male: string, female: string, other: string) => string;

	updateValidities: {
		single: (value: string, canProceed: boolean, setCanProceed: (val: boolean) => void) => void;
		double: (
			val1: string,
			val2: string,
			mustBeEqual: boolean,
			canProceed: boolean,
			setCanProceed: (val: boolean) => void
		) => void;
	};
}

export interface RegisterComponentProps {
	// Whether the input is valid and the user can go on
	canProceed: boolean;

	// Function to set whether the input is valid and the user can go on
	setCanProceed: (allow: boolean) => void;
}

export type RegisterPageLabels = "welcome" | "nameAndSurname" | "gender" | "birthdate" | "password" | "username";

export type GenderLabels = "male" | "female" | "other";

export type HomePageSvgsNames = "test";

export type ClickableSvgProps = { onClickAction?: Function };

export type StorageKeys = "userID" | "pwd" | "diaryMode";

export interface StorageConnection {
	storeValue: (key: StorageKeys, val: any) => void;
	getValue: (key: StorageKeys) => any;
	clearAll: () => void;
	isOk: boolean;
}

export interface avatarSpecs {}
export interface userSpecs {
	name: string;
	surname: string;
	gender: GenderLabels | "";
	birthDate: moment.Moment;
	username: string;
}

export interface AppContextStructure {
	storage: StorageConnection;
	storedValues: {
		userDetails: StateVariable<"notLoaded" | userSpecs>;
		userAvatar: StateVariable<"notLoaded" | "default" | avatarSpecs>;
	};
	loaders: {
		loadAvatar: () => void;
		loadUserDetails: () => void;
	};
	clearUserData: () => void;
	getGenderString: (male: string, female: string, other: string) => string;
	getGenderTerminations: () => string; // equivalent to getGenderString("o", "a", "*")
}

export type svgLinks = "friends" | "challenge" | "diary" | "goals" | "trend" | "tips";

export const tipsCategoriesList = [
	"sport",
	"health",
	"money",
	"education",
	"timeManag",
	"relationships",
	"travel",
	"freeTime"
] as const;

export type tipsCategories = (typeof tipsCategoriesList)[number];

export const isTipCategory = (s: string): s is tipsCategories => {
	return (tipsCategoriesList as unknown as string[]).includes(s);
};

export const tipCategoryName = (s: tipsCategories) => {
	return {
		sport: "Sport",
		health: "Salute",
		money: "Gestione del denaro",
		timeManag: "Gestione del tempo",
		education: "Istruzione",
		relationships: "Relazioni",
		travel: "Viaggi",
		freeTime: "Tempo libero"
	}[s];
};

export type appColors = "violet" | "white" | "night" | "grey" | "white-violet-text";

export type pandaTypes =
	| "waving"
	| "bamboo"
	| "cantSee"
	| "computer"
	| "confused"
	| "relaxed"
	| "skateboard"
	| "smiley"
	| "surprised";

export const diaryActivitiesList = [
	"love",
	"friends",
	"music",
	"nature",
	"meditation",
	"selfcare",
	"draw",
	"alone",
	"timeManag",
	"pet",
	"study",
	"sport",
	"work",
	"play",
	"explore",
	"cinema",
	"creativity",
	"relax"
] as const;

export type diaryActivities = (typeof diaryActivitiesList)[number];
