/*

description:
	Happy welcomes you
	
state:

hooks:

context:
	
*/

import { IonCol, IonGrid, IonRow } from "@ionic/react";

import { RegisterComponentProps } from "../../types";

import SpeechBubble from "../General_components/SpeechBubble";
import PandaImg from "../General_components/PandaImg";

const Welcome = ({ canProceed, setCanProceed }: RegisterComponentProps) => {
	return (
		<IonGrid className="h-100percent">
			<IonRow className="h-100percent ion-align-items-center">
				<IonCol>
					<SpeechBubble
						content={
							<>
								<p>Ciao!</p>
								<p>Io sono Happy, la mascotte di questa app.</p>
								<p>Prima di portarti a scoprire l'app, ho bisogno di conoscerti un pochino.</p>
							</>
						}
					/>
					<PandaImg type="waving" />
				</IonCol>
			</IonRow>
		</IonGrid>
	);
};

export default Welcome;
