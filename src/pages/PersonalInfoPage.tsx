/*

description:
	
	
state:
	- 
	
hooks:
	- 
	
context:
	- ApiContext
	
*/

import { IonContent, IonHeader, IonPage, IonRow, IonSpinner, IonTitle, IonToolbar } from "@ionic/react";
import API from "../api";
import { AppContext } from "../components/AppContext";
import { useContext, useEffect } from "react";
import moment from "moment";
import DataDisplay from "../components/General_components/DataDisplay";
import Avatar from "../components/General_components/Avatar";

export interface PersonalInfoPageProps {}

const PersonalInfoPage = () => {
	const appContext = useContext(AppContext);

	useEffect(() => {
		const loadDataIfNecessary = async () => {
			if (appContext.storedValues.userAvatar.val === "notLoaded") {
				const avatar = await API.getAvatar({ userID: await appContext.storage.getValue("userID") });
				console.debug(avatar)
				if (avatar) {
					if (avatar.isCustom) {
						if (avatar.details) appContext.storedValues.userAvatar.set(avatar.details);
					} else appContext.storedValues.userAvatar.set("default");
				}
			}

			if (appContext.storedValues.userDetails.val === "notLoaded") {
				const userDetails = await API.getInfo({
					userID: await appContext.storage.getValue("userID"),
					pwd: await appContext.storage.getValue("pwd")
				});
				if (userDetails)
					appContext.storedValues.userDetails.set({
						birthDate: moment(userDetails.details.Birthdate, "yyyy-MM-DD"),
						gender: userDetails.details.Sex,
						name: userDetails.details.Name,
						surname: userDetails.details.Surname,
						username: userDetails.details.Username
					});
			}
		};
		if (appContext.storage.isOk) loadDataIfNecessary();
	}, [appContext.storage, appContext.storedValues]);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>I tuoi dati</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent color="main">
				<div className="w-100-percent h-100-percent flex-col-reverse ion-padding-bottom">
					{appContext.storedValues.userDetails.val === "notLoaded" ? (
						<IonRow>
							<IonSpinner />
						</IonRow>
					) : (
						<>
							<DataDisplay
								label="Genere"
								value={
									appContext.storedValues.userDetails.val.gender === "male"
										? "Uomo"
										: appContext.storedValues.userDetails.val.gender === "female"
										? "Donna"
										: "Altro"
								}
							/>
							<DataDisplay
								label="Data di nascita"
								value={appContext.storedValues.userDetails.val.birthDate.format("DD/MM/yyyy")}
							/>
							<DataDisplay
								label="Nome e cognome"
								value={`${appContext.storedValues.userDetails.val.name} ${appContext.storedValues.userDetails.val.surname}`}
							/>
							<DataDisplay label="Username" value={appContext.storedValues.userDetails.val.username} />
							<div className="flex-fill">
								<div className="max-90-percent center">
									<Avatar
										isDefault={appContext.storedValues.userAvatar.val === "default"}
										editLink="/editAvatar"
									/>
								</div>
							</div>
						</>
					)}
				</div>
			</IonContent>
		</IonPage>
	);
};

export default PersonalInfoPage;
