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
	fontSize: "bigger" | "app" | "smaller";
	noMargin?: boolean;
	shorter?: boolean;
}

const Button = ({ text, action, color, disabled, link, fontSize, noMargin, shorter }: ButtonProps) => {
	const [redirect, setRedirect] = useState<boolean>(false);

	if (redirect && link) return <Redirect to={link} />;

	return (
		<div className={`${!noMargin && "item-horizontal-margin"}`}>
			<IonButton
				color={color}
				shape="round"
				className={`no-caps w-100-percent font-size-${fontSize} ${
					!shorter && "pill-height-normal"
				} ion-text-wrap with-shadow rounded`}
				onClick={() => {
					action && action();
					link && setRedirect(true);
				}}
				disabled={disabled ?? false}
			>
				{text}
			</IonButton>
		</div>
	);
};

export default Button;
