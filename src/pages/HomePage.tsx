/*

description:
	
	
state:
	- 
	
hooks:
	- 
	
context:
	- 

*/

import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from "@ionic/react";
import { Link } from "react-router-dom";

export interface HomePageProps {}

const HomePage = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>App-Y</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent color="main">
				<Link to="/personalInfoPage">
					<IonButton color="main">Pagina info personali</IonButton>
				</Link>
			</IonContent>
		</IonPage>
	);
};

export default HomePage;
