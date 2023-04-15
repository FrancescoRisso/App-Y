/*

description:
	The footer of the registration page, with the optionally-disabled "next" button
	
state:
	
hooks:
	
context:
	
*/

import { IonFooter, IonNavLink, IonButton, IonIcon, IonAlert } from "@ionic/react";
import { arrowForwardOutline, enterOutline } from "ionicons/icons";

import Common from "./RegisterCommon";
import API from "../../../api";
import { useContext, useRef, useState } from "react";
import { RegisterContext } from "./RegisterContext";
import { Link } from "react-router-dom";
import { AppContext } from "../../AppContext";

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
	const registerContext = useContext(RegisterContext);
	const appContext = useContext(AppContext);

	const goToMainPage = useRef<HTMLAnchorElement>(null);

	const [usernameInvalid, setUsernameInvalid] = useState<boolean>(false);

	return (
		<IonFooter className="main-color ion-text-end">
			<Link to="/home" className="ion-hide" ref={goToMainPage} />
			<IonAlert
				isOpen={usernameInvalid}
				message="L'username scelto è già in uso"
				buttons={["OK"]}
				onDidDismiss={() => setUsernameInvalid(false)}
			></IonAlert>

			{nextPageEnabled ? (
				isLastPage ? (
					<IonButton
						color="main"
						onClick={async () => {
							const res = await API.register({
								username: registerContext.username.val,
								pwd: registerContext.password.val,
								birthdate: registerContext.birthDate.val.format("YYYY-MM-GG"),
								name: registerContext.name.val,
								surname: registerContext.surname.val,
								sex: registerContext.gender.val === "" ? "other" : registerContext.gender.val
							});

							if (res?.correct) {
								await appContext.storage.storeValue("userID", res.userId);
								await appContext.storage.storeValue("pwd", registerContext.password.val);
								goToMainPage.current?.click();
							} else {
								setUsernameInvalid(true);
							}
						}}
					>
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
