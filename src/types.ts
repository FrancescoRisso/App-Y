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

export type StorageKeys = "userID" | "pwd";

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
}

export type svgLinks = "friends" | "challenge" | "diary" | "goals" | "trend" | "tips";
