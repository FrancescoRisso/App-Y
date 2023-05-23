/*

description:
	
	
state:
	- 
	
hooks:
	- 
	
context:
	- 
	
imported into:
	- 
	
component dependences:
	- 
	
other dependences:
	- 
	
*/

import { IonGrid, IonRow, IonCol, IonButton } from "@ionic/react";

export interface ImageAndSwitchProps {
	animating: boolean;
	startAnimating: () => void;
	pandaSunMoon: JSX.Element;
}

const ImageAndSwitch = ({ animating, startAnimating, pandaSunMoon }: ImageAndSwitchProps) => {
	return (
		<IonGrid className="h-100-percent ion-align-items-center">
			<IonRow className="h-70-percent">
				<IonCol className="h-100-percent">
					{pandaSunMoon}
					{!animating && <IonButton onClick={startAnimating}>Cambia</IonButton>}
				</IonCol>
			</IonRow>
		</IonGrid>
	);
};

export default ImageAndSwitch;
