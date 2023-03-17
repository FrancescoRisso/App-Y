/*

description:
	The footer of the registration page, with the optionally-disabled "next" button
	
state:
	
hooks:
	
context:
	
*/

import { IonFooter, IonNavLink, IonButton, IonIcon } from "@ionic/react";
import { arrowForwardOutline } from "ionicons/icons";
import Common from "./RegisterCommon";

export interface RegisterFooterProps {
	// Whether the "next" button should be enabled
	nextPageEnabled?: boolean;

	// An extra action to be done when the "next" button is pressed
	nextClickAction: () => void;
}

const RegisterFooter = ({ nextPageEnabled, nextClickAction }: RegisterFooterProps) => {
	return (
		<IonFooter className="main-color ion-text-end">
			{nextPageEnabled ? (
				<IonNavLink routerDirection="forward" component={() => <Common />}>
					<IonButton color="main" onClick={nextClickAction}>
						<IonIcon slot="end" icon={arrowForwardOutline} />
						Avanti
					</IonButton>
				</IonNavLink>
			) : (
				<IonButton color="main" disabled>
					<IonIcon slot="end" icon={arrowForwardOutline} />
					Avanti
				</IonButton>
			)}
		</IonFooter>
	);
};

export default RegisterFooter;
