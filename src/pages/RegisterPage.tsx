/*

description:
	The registration page
	
state:
	
hooks:
	
context:
	
*/

import { useContext, useMemo, useRef, useState } from "react";
import Input from "../components/General_components/Input";
import API from "../api";
import { GenderLabels } from "../types";
import Button from "../components/General_components/Button";
import { IonAlert } from "@ionic/react";
import { AppContext } from "../components/AppContext";
import { Link } from "react-router-dom";

export interface RegisterPageProps {}

const RegisterPage: React.FC = () => {
	const [name, setName] = useState<string>("");
	const [surname, setSurname] = useState<string>("");
	const [pwd, setPwd] = useState<string>("");
	const [confirmPwd, setConfirmPwd] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const [usernameValid, setUsernameValid] = useState<boolean | null>();
	const [gender, setGender] = useState<GenderLabels | "">("");

	const [usernameConfirmInvalid, setUsernameConfirmInvalid] = useState<boolean>(false);

	const context = useContext(AppContext);

	const goToMainPage = useRef<HTMLAnchorElement>(null);

	const allOk = useMemo(
		() => name !== "" && surname !== "" && pwd !== "" && confirmPwd === pwd && usernameValid && gender !== "",
		[name, surname, pwd, confirmPwd, usernameValid, gender]
	);

	return (
		<form className="h-100-percent justify-content-vertically-space-outside pt-5" onSubmit={() => {}}>
			<Link to="/home" className="ion-hide" ref={goToMainPage} />
			<IonAlert
				isOpen={usernameConfirmInvalid}
				message="L'username scelto è già in uso"
				buttons={["OK"]}
				onDidDismiss={() => setUsernameConfirmInvalid(false)}
			></IonAlert>

			<Input
				label="Nome"
				onInputAction={(val) => {
					setName(val);
				}}
				value={name}
				type="text"
			/>

			<Input
				label="Cognome"
				onInputAction={(val) => {
					setSurname(val);
				}}
				value={surname}
				type="text"
			/>

			<Input
				label="Genere"
				onInputAction={(val) => {
					setGender(val as GenderLabels);
				}}
				value={gender}
				type="text"
				options={[
					{ name: "Uomo", val: "male" },
					{ name: "Donna", val: "female" },
					{ name: "Altro", val: "other" }
				]}
			/>

			<Input
				label="Password"
				onInputAction={(val) => {
					setPwd(val);
				}}
				value={pwd}
				type="password"
			/>

			<Input
				label="Conferma password"
				onInputAction={(val) => {
					setConfirmPwd(val);
				}}
				value={confirmPwd}
				type="password"
				error={
					pwd !== "" && confirmPwd !== ""
						? pwd !== confirmPwd
							? "Le password non corrispondono"
							: "Ok"
						: undefined
				}
			/>

			<Input
				label="Scegli uno username"
				onInputAction={async (user) => {
					setUsername(user);

					const apiResponse = await API.isUsernameTaken({ username: user });
					setUsernameValid(!apiResponse?.isUsed);
				}}
				value={username}
				type="text"
				error={
					usernameValid === undefined
						? undefined
						: usernameValid
						? "Sembra sia libero"
						: "Questo username è già usato"
				}
			/>

			<Button
				color="violet"
				fontSize="app"
				text={allOk ? "Conferma" : "Dati incompleti"}
				disabled={!allOk}
				action={async () => {
					const res = await API.register({
						username,
						pwd,
						birthdate: "2023-05-29",
						// birthdate: registerContext.birthDate.val.format("YYYY-MM-GG"),
						name,
						surname,
						sex: gender === "" ? "other" : gender
					});

					if (res?.correct) {
						await context.storage.storeValue("userID", res.userId);
						await context.storage.storeValue("pwd", pwd);
						goToMainPage.current?.click();
					} else {
						setUsernameConfirmInvalid(true);
					}
				}}
			/>
		</form>
	);
};

export default RegisterPage;
