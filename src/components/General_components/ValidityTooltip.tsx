/*

description:
	Tells you if something is valid or not, and why
	
state:
	
hooks:
	
context:
	
*/

import { IonText, IonIcon } from "@ionic/react";
import { checkmarkOutline, closeOutline } from "ionicons/icons";

export interface ValidityTooltipProps {
	isValid: boolean;
	validMessage: string;
	errorMessage: string;
	isPresent: boolean;
}

const ValidityTooltip = ({ isPresent, isValid, validMessage, errorMessage }: ValidityTooltipProps) => {
	if (!isPresent) return <></>;
	return (
		<IonText className="mx-10px">
			<IonIcon icon={isValid ? checkmarkOutline : closeOutline} />
			<small>{isValid === null ? "" : isValid ? validMessage : errorMessage}</small>
		</IonText>
	);
};

export default ValidityTooltip;
