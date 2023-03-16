/*

description:
	The login page
	
state:
	
hooks:
	
context:
	
*/

import { IonContent, IonHeader, IonPage, IonToolbar, IonTitle } from "@ionic/react";
import Login from "../components/Login";

export interface LoginPageProps {}

const LoginPage: React.FC = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>App-Y</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent color="main">
				<Login />
			</IonContent>
		</IonPage>
	);
};

export default LoginPage;
