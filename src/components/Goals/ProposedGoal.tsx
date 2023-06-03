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

import { IonCard, IonCardContent, IonIcon } from "@ionic/react";
import { addCircleOutline } from "ionicons/icons";

export interface ProposedGoalProps {
	activity: string;
	image?: string;
	setTitle: (title: string) => void;
	swiperWidth: number | string;
	swiperHeight: number | string;
	openModal: () => void;
}

const ProposedGoal = ({ activity, setTitle, image, swiperHeight, swiperWidth, openModal }: ProposedGoalProps) => {
	return (
		<div className="pb-2 center-horizontally" style={{ width: swiperWidth }}>
			<IonCard
				className="m-0 with-shadow h-100-percent"
				color="white"
				style={{ height: swiperHeight }}
				onClick={() => {
					setTitle(activity === "Custom" ? "" : activity);
					openModal();
				}}
			>
				{activity === "Custom" ? (
					<IonCardContent className="center-vertically">
						<h1 className="ion-text-center">
							<b>Crea il tuo obbiettivo</b>
						</h1>
						<br />
						<div className="ion-text-center">
							<IonIcon icon={addCircleOutline} color="violet" style={{ fontSize: "500%" }} />
						</div>
					</IonCardContent>
				) : (
					<IonCardContent className="p-0">
						<img src={image} alt={activity} height={swiperHeight} style={{ overflow: "visible" }} />
					</IonCardContent>
				)}
			</IonCard>
		</div>
	);
};

export default ProposedGoal;
