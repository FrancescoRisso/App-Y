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

import { IonGrid, IonRow, IonCol, IonToggle } from "@ionic/react";

export interface ImageAndSwitchProps {
	animating: boolean;
	startAnimating: () => void;
	pandaSunMoon: JSX.Element;
	time: "day" | "night";
}

const ImageAndSwitch = ({ animating, startAnimating, pandaSunMoon, time }: ImageAndSwitchProps) => {
	return (
		<IonGrid className="h-100-percent ion-align-items-center">
			<IonRow className="h-55-percent">
				<IonCol className="h-100-percent">
					<div className="center-vertically">{pandaSunMoon}</div>
				</IonCol>
			</IonRow>
			<IonRow className="h-45-percent">
				<IonCol>
					<div className="ion-text-center">
						<IonToggle
							className="py-1 day-night-toggle"
							onIonChange={startAnimating}
							checked={(time === "night" && !animating) || (animating && time === "day")}
						/>
						<p className="my-0 font-title">Routine</p>
						<p className="my-0 font-title">{time === "day" ? "mattutina" : "serale"}</p>
					</div>
				</IonCol>
			</IonRow>
		</IonGrid>
	);
};

export default ImageAndSwitch;
