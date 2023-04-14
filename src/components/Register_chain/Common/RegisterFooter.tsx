/*

description:
	The footer of the registration page, with the optionally-disabled "next" button
	
state:
	
hooks:
	
context:
	
*/

import { IonFooter, IonNavLink, IonButton, IonIcon } from "@ionic/react";
import { arrowForwardOutline, enterOutline } from "ionicons/icons";

import Common from "./RegisterCommon";

export interface RegisterFooterProps {
	// Whether the "next" button should be enabled
	nextPageEnabled?: boolean;

	// An extra action to be done when the "next" button is pressed
	nextClickAction: () => void;

	// Whether this is the last page of the registration, so that the button
	// should display "Registrati" instead of "Avanti"
	isLastPage?: boolean;
}

const RegisterFooter = ({ nextPageEnabled, nextClickAction, isLastPage }: RegisterFooterProps) => {
	return (
		<IonFooter className="main-color ion-text-end">
			{nextPageEnabled ? (
				isLastPage ? (
					<IonButton color="main" onClick={async () => {
						
					}}>
						<IonIcon slot="end" icon={enterOutline} />
						Registrati
					</IonButton>
				) : (
					<IonNavLink
						routerDirection="forward"
						component={() => {
							nextClickAction();
							return <Common />;
						}}
					>
						<IonButton color="main">
							<IonIcon slot="end" icon={arrowForwardOutline} />
							Avanti
						</IonButton>
					</IonNavLink>
				)
			) : (
				<IonButton color="main" disabled>
					<IonIcon slot="end" icon={isLastPage ? enterOutline : arrowForwardOutline} />
					{isLastPage ? "Registrati" : "Avanti"}
				</IonButton>
			)}
		</IonFooter>
	);
};

export default RegisterFooter;
