/*

description:
	
	
state:
	- 
	
hooks:
	- 
	
context:
	- ApiContext
	
*/

import { IonRow, IonSpinner } from "@ionic/react";
import { AppContext } from "../components/AppContext";
import { useContext, useEffect } from "react";
import DataDisplay from "../components/General_components/DataDisplay";
import Avatar from "../components/General_components/Avatar";

export interface PersonalInfoPageProps {}

const PersonalInfoPage = () => {
	const appContext = useContext(AppContext);

	useEffect(() => {
		appContext.loaders.loadAvatar();
		appContext.loaders.loadUserDetails();
	}, [appContext.loaders]);

	return (
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
								link="/editAvatar"
								editAvatarText
							/>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default PersonalInfoPage;
