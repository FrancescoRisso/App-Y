/*

description:
	Displays all the panda icons
	
state:
	
hooks:
	
context:
	
*/

import { IonContent, IonPage } from "@ionic/react";
import PandaImg from "../components/General_components/PandaImg";

const PandaDisplayer = () => {
	return (
		<IonPage>
			<IonContent color="main">
				<PandaImg type="bamboo" />
				<PandaImg type="cantSee" />
				<PandaImg type="computer" />
				<PandaImg type="confused" />
				<PandaImg type="relaxed" />
				<PandaImg type="skateboard" />
				<PandaImg type="smiley" />
				<PandaImg type="surprised" />
				<PandaImg type="waving" />
			</IonContent>
		</IonPage>
	);
};

export default PandaDisplayer;
