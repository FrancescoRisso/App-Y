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

	getGenderString: (male: string, female: string, other: string) => string;
}

export interface RegisterComponentProps {
	// Whether the input is valid and the user can go on
	canProceed: boolean;

	// Function to set whether the input is valid and the user can go on
	setCanProceed: (allow: boolean) => void;
}

export type RegisterPageLabels = "welcome" | "nameAndSurname" | "gender" | "birthdate";

export type GenderLabels = "male" | "female" | "other";
