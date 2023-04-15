/*

description:
	All the items required for logging in

state:
	- username: the inputed username
	- pwd: the inputed password

hooks:
	- useRef goToMainPage: a reference to a link to redirect to the main page

context:
	- AppContext

*/

import {
	IonAlert,
	IonButton,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardTitle,
	IonCol,
	IonGrid,
	IonRow
} from "@ionic/react";
import { useContext, useRef, useState } from "react";
import Input from "./General_components/Input";
import Button from "./General_components/Button";
import { Link } from "react-router-dom";
import { AppContext } from "./AppContext";
import API from "../api";

export interface LoginProps {}

const Login = () => {
	const goToMainPage = useRef<HTMLAnchorElement>(null);

	const [username, setUsername] = useState<string>("");
	const [pwd, setPwd] = useState<string>("");
	const [wrongInfo, setWrongInfo] = useState<boolean>(false);

	const appContext = useContext(AppContext);

	return (
		<IonCard color="light" className="ion-padding center-vertically">
			<IonAlert
				isOpen={wrongInfo}
				message="Username e/o password errati"
				buttons={["OK"]}
				onDidDismiss={() => setWrongInfo(false)}
			></IonAlert>

			<IonCardHeader>
				<IonCardTitle>Login</IonCardTitle>
			</IonCardHeader>
			<IonCardContent>
				<Link to="/home" className="ion-hide" ref={goToMainPage} />
				<IonGrid className="ion-text-center">
					<form>
						<IonRow>
							<IonCol>
								<Input
									type="text"
									label="Username"
									onInputAction={(e) => {
										setUsername(String(e.currentTarget.value) ?? "");
									}}
									value={username}
								/>
							</IonCol>
						</IonRow>

						<IonRow>
							<IonCol>
								<Input
									type="password"
									label="Password"
									onInputAction={(e) => {
										setPwd(String(e.currentTarget.value) ?? "");
									}}
									value={pwd}
								/>
							</IonCol>
						</IonRow>
					</form>
					<br />

					<IonRow>
						<IonCol>
							<IonButton
								color="main"
								disabled={username === "" || pwd === ""}
								onClick={async () => {
									const login = await API.login({ username, pwd });
									if (login?.correct) {
										await appContext.storage.storeValue("userID", login.userId);
										await appContext.storage.storeValue("pwd", pwd);
										goToMainPage.current?.click();
									} else setWrongInfo(true);
								}}
							>
								Login
							</IonButton>
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
