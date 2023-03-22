/*

description:
	The registration page
	
state:
	
hooks:
	
context:
	
*/

import { IonNav, IonPage } from "@ionic/react";
import RegisterCommon from "../components/Register_chain/Common/RegisterCommon";
import RegisterContextProvider from "../components/Register_chain/Common/RegisterContext";

export interface RegisterPageProps {}

const RegisterPage: React.FC = () => {
	return (
		<RegisterContextProvider
			child={
				<IonPage>
					<IonNav root={() => <RegisterCommon />} />
				</IonPage>
			}
		/>
	);
};

export default RegisterPage;
