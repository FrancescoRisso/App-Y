/*
description:
A button
state:
hooks:
context:
*/

import { IonButton } from "@ionic/react";
import { appColors } from "../../types";
import { useState } from "react";
import { Redirect } from "react-router";

export interface ButtonProps {
	text: string;
	action?: () => void | Promise<void>;
	color: appColors;
	disabled?: boolean;
	link?: string;
}

const Button = ({ text, action, color, disabled, link }: ButtonProps) => {
	const [redirect, setRedirect] = useState<boolean>(false);

	if (redirect && link) return <Redirect to={link} />;

	return (
		<IonButton
			color={color}
			shape="round"
			className="no-caps font-size-bigger item-horizontal-margin pill-height-normal"
			onClick={() => {
				action && action();
				link && setRedirect(true);
			}}
			disabled={disabled ?? false}
		>
			{text}
		</IonButton>
	);
};

export default Button;
