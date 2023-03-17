/*

description:
	Displays an header, optionally with a ion-router back button
	
state:
	
hooks:
	
context:

*/

import { IonHeader, IonToolbar, IonButtons, IonNavLink, IonButton, IonIcon, IonTitle } from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";

export interface HeaderProps {
	// The title of the page
	title: string;

	// Whether the "back" navbutton should be displayed
	displayBackButton?: boolean;

	// Action to be done when the "back" navbutton is pressed
	onBackAction?: () => void;
}

const Header = ({ title, displayBackButton, onBackAction }: HeaderProps) => {
	return (
		<IonHeader>
			<IonToolbar>
				<IonButtons slot="start">
					{displayBackButton && (
						<IonNavLink routerDirection="back">
							<IonButton onClick={onBackAction}>
								<IonIcon slot="start" icon={arrowBackOutline} />
							</IonButton>
						</IonNavLink>
					)}
				</IonButtons>

				<IonTitle>{title}</IonTitle>
			</IonToolbar>
		</IonHeader>
	);
};

export default Header;
