/*

description:
	
	
state:
	- 
	
hooks:
	- 
	
context:
	- 

*/

import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import API from "../api";
import { AppContext } from "../components/AppContext";

export interface HomePageProps {}

const HomePage = () => {
	const [userInfo, setUserInfo] = useState<string>("");

	const appContext = useContext(AppContext);

	useEffect(() => {
		const getData = async () => {
			if (appContext.storage.isOk) {
				const userID = await appContext.storage.getValue("userID");
				const pwd = await appContext.storage.getValue("pwd");
				API.getInfo({ userID, pwd }).then((data) => setUserInfo(JSON.stringify(data)));
			}
		};
		getData();
	}, [appContext.storage]);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>App-Y</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent color="main">
				<p>{userInfo}</p>
			</IonContent>
		</IonPage>
	);
};

export default HomePage;
