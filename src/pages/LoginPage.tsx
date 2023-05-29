/*

description:
	The login page
	
state:
	
hooks:
	
context:
	
*/

import { IonAlert } from "@ionic/react";

import Input from "../components/General_components/Input";
import { useRef, useState, useContext } from "react";
import { AppContext } from "../components/AppContext";
import Button from "../components/General_components/Button";
import API from "../api";
import { Link } from "react-router-dom";

export interface LoginPageProps {}

const LoginPage: React.FC = () => {
	const goToMainPage = useRef<HTMLAnchorElement>(null);

	const [username, setUsername] = useState<string>("");
	const [pwd, setPwd] = useState<string>("");
	const [wrongInfo, setWrongInfo] = useState<boolean>(false);

	const appContext = useContext(AppContext);

	return (
		<>
			<Link to="/home" className="ion-hide" ref={goToMainPage} />
			<IonAlert
				isOpen={wrongInfo}
				message="Username e/o password errati"
				buttons={["OK"]}
				onDidDismiss={() => setWrongInfo(false)}
			></IonAlert>

			<form
				className="ion-padding-top ion-padding-bottom h-55-percent justify-content-vertically-space-outside"
				onSubmit={() => {}}
			>
				<Input
					type="text"
					label="Username"
					value={username}
					onInputAction={(val) => {
						setUsername(val);
					}}
				/>

				<br />
				<div>
					<Input
						type="password"
						label="Password"
						value={pwd}
						onInputAction={(val) => {
							setPwd(val);
						}}
					/>
					<p
						className="ion-text-center underlined mb-1 mt-2 grey-text"
						onClick={() => {
							console.debug("Pwd dimenticata? Ti attacchi");
						}}
					>
						Password dimenticata?
					</p>
				</div>
			</form>
			<div className="h-45-percent justify-content-vertically-space-outside">
				<Button
					fontSize="bigger"
					color="violet"
					text="Login"
					disabled={username === "" || pwd === ""}
					action={async () => {
						const login = await API.login({ username, pwd });
						if (login?.correct) {
							await appContext.storage.storeValue("userID", login.userId);
							await appContext.storage.storeValue("pwd", pwd);
							goToMainPage.current?.click();
						} else setWrongInfo(true);
					}}
				/>
				<Button fontSize="bigger" color="night" text="Registrati" link="/register" />
			</div>
		</>
	);
};

export default LoginPage;
