/*

description:
	All the items required for logging in

state:

hooks:
	- useRef usernameBox: a reference to the username input
	- useRef passwordBox: a reference to the password input
	
context:

*/

import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonRow } from "@ionic/react";
import { useRef } from "react";
import Input from "./General_components/Input";
import Button from "./General_components/Button";
import { Link } from "react-router-dom";

export interface LoginProps {}

const Login = () => {
	const usernameBox = useRef<HTMLIonInputElement>(null);
	const passwordBox = useRef<HTMLIonInputElement>(null);

	return (
		<IonCard color="light" className="ion-padding center-vertically">
			<IonCardHeader>
				<IonCardTitle>Login</IonCardTitle>
			</IonCardHeader>
			<IonCardContent>
				<IonGrid className="ion-text-center">
					<IonRow>
						<IonCol>
							<Input type="text" label="Username o email" reference={usernameBox} />
						</IonCol>
					</IonRow>

					<IonRow>
						<IonCol>
							<Input type="password" label="Password" reference={passwordBox} />
						</IonCol>
					</IonRow>

					<br />

					<IonRow>
						<IonCol>
							<Button text="Login" />
						</IonCol>
					</IonRow>

					<IonRow>
						<IonCol>oppure</IonCol>
					</IonRow>

					<IonRow>
						<IonCol>
							<Link to="/register">
								<Button text="Registrati" />
							</Link>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonCardContent>
		</IonCard>
	);
};

export default Login;
