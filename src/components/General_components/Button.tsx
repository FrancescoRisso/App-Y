/*

description:
A button

state:

hooks:

context:

*/

import { IonButton } from "@ionic/react";

export interface ButtonProps {
	text: string;
	action?: () => null;
	link?: string;
}

const Button = ({ text, action, link }: ButtonProps) => {
	return (
		<IonButton color="main" onClick={action ? action : (e) => {}}>
			{text}
		</IonButton>
	);
};

export default Button;
