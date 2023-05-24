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
	fontSize: "bigger" | "app";
	noMargin?: boolean;
}

const Button = ({ text, action, color, disabled, link, fontSize, noMargin }: ButtonProps) => {
	const [redirect, setRedirect] = useState<boolean>(false);

	if (redirect && link) return <Redirect to={link} />;

	return (
		<div className={`${!noMargin && "item-horizontal-margin"}`}>
			<IonButton
				color={color}
				shape="round"
				className={`no-caps w-100-percent font-size-${fontSize} pill-height-normal ion-text-wrap`}
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
