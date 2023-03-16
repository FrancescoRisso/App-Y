/*

description:
	The module needed to register a new user
	
state:
	- 
	
hooks:
	- 
	
context:
	- 
	
*/

import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol } from "@ionic/react";
import Button from "./General_components/Button";
import Input from "./General_components/Input";
import { useRef, useState } from "react";

export interface RegisterProps {}

const Register = () => {
	const usernameBox = useRef<HTMLIonInputElement>(null);
	const passwordBox = useRef<HTMLIonInputElement>(null);
	const confirmPasswordBox = useRef<HTMLIonInputElement>(null);

	const [pwdValid, setPwdValid] = useState<boolean>(true);

	return (
		<IonCard color="light" className="ion-padding center-vertically">
			<IonCardHeader>
				<IonCardTitle>Registrati</IonCardTitle>
			</IonCardHeader>
			<IonCardContent>
				<IonGrid className="ion-text-center">
					<IonRow>
						<IonCol>
							<Input type="email" label="Email" reference={usernameBox} />
						</IonCol>
					</IonRow>

					<IonRow>
						<IonCol>
							<Input type="password" label="Password" reference={passwordBox} />
						</IonCol>
					</IonRow>

					<IonRow>
						<IonCol>
							<Input
								type="password"
								label="Conferma password"
								reference={confirmPasswordBox}
								error={pwdValid ? "" : "Le due password non corrispondono"}
								loseFocusAction={() => {
									setPwdValid(confirmPasswordBox.current!.value === passwordBox.current!.value);
								}}
							/>
						</IonCol>
					</IonRow>

					<br />

					<IonRow>
						<IonCol>
							<Button text="Registrati" />
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonCardContent>
		</IonCard>
	);
};

export default Register;
