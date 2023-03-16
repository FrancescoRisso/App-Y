/*

description:
	The registration page
	
state:
	
hooks:
	
context:
	
*/

import { IonContent, IonHeader, IonPage, IonToolbar, IonTitle } from "@ionic/react";
import Register from "../components/Register";

export interface RegisterPageProps {}

const RegisterPage: React.FC = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>App-Y</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent color="success">
				<Register />
			</IonContent>
		</IonPage>
	);
};

export default RegisterPage;
