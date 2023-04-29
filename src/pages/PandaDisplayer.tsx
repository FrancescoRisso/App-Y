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
				<PandaImg width="80%" type="bamboo" />
				<PandaImg width="80%" type="cantSee" />
				<PandaImg width="80%" type="computer" />
				<PandaImg width="80%" type="confused" />
				<PandaImg width="80%" type="relaxed" />
				<PandaImg width="80%" type="skateboard" />
				<PandaImg width="80%" type="smiley" />
				<PandaImg width="80%" type="surprised" />
				<PandaImg width="80%" type="waving" />
			</IonContent>
		</IonPage>
	);
};

export default PandaDisplayer;
