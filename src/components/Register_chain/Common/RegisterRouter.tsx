/*

description:
	Given a register page "name", returns the correct component with the correct props
	
state:
	
hooks:
	
context:
	
*/

import { RegisterPageLabels } from "../../../types";

import Welcome from "../01-Welcome";
import NameAndSurname from '../02-NameAndSurname';

export interface RegisterRouterProps {
	// The string identifier of the page
	pageName: RegisterPageLabels;

	// As per in RegisterComponentProps
	canProceed: boolean;
	setCanProceed: (allow: boolean) => void;
}

const RegisterRouter = ({ pageName, canProceed, setCanProceed }: RegisterRouterProps) => {
	switch (pageName) {
		case "welcome":
			return <Welcome canProceed={canProceed} setCanProceed={setCanProceed} />;

		case "nameAndSurname":
			return <NameAndSurname canProceed={canProceed} setCanProceed={setCanProceed} />;
	}
};

export default RegisterRouter;
