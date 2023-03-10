/*

description:
	The login page
	
state:
	
hooks:
	
context:
	
*/

import { IonContent, IonHeader, IonPage, IonToolbar, IonTitle } from "@ionic/react";
import Login from "../components/Login/Login";

export interface LoginPageProps {}

const LoginPage: React.FC = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>App-Y</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent color="success">
				<Login />
			</IonContent>
		</IonPage>
	);
};

export default LoginPage;
