/*

description:
	Displays a card to show some personal user data
	
state:
	
hooks:
	
context:

*/

import { IonRow, IonCol, IonCardHeader, IonCardTitle, IonCard, IonIcon, IonItem, IonCardSubtitle } from "@ionic/react";
import { pencilOutline } from "ionicons/icons";

export interface DataDisplayProps {
	// The label of the data (eg "Birth date")
	label: string;

	// The actual data (eg "01/01/2000")
	value: string;
}

const DataDisplay = ({ label, value }: DataDisplayProps) => {
	return (
		<IonRow className="flex-fixed">
			<IonCol>
				<IonCard color="light" className="no-margin-vertical">
					<IonCardHeader className="no-padding-bottom">
						<IonCardSubtitle>{label}</IonCardSubtitle>
						<IonCardTitle>
							<IonItem color="light">
								{value}
								<IonIcon
									slot="end"
									icon={pencilOutline}
									onClick={() => {
										console.debug("Ciao");
									}}
								/>
							</IonItem>
						</IonCardTitle>
					</IonCardHeader>
				</IonCard>
			</IonCol>
		</IonRow>
	);
};

export default DataDisplay;
