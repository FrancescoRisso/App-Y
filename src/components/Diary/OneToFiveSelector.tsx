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

import { IonCol, IonGrid, IonRadio, IonRadioGroup, IonRow } from "@ionic/react";

export interface OneToFiveSelectorProps {
	title: string;
	value: number;
	setValue: (val: number) => void;
	color: "day" | "night";
}

const OneToFiveSelector = ({ title, value, setValue, color }: OneToFiveSelectorProps) => {
	return (
		<div className="h-20-percent ion-text-center">
			<div className="center-vertically">
				<p className="ion-text-center font-size-bigger mt-0">{title}</p>
				<IonGrid className="w-65-percent">
					<IonRow>
						{Array.from({ length: 5 }, (x, i) => i + 1).map((val) => (
							<IonCol key={val}>
								<IonRadioGroup value={value >= val}>
									<IonRadio
										className={`diary-radio diary-radio-${color}`}
										value={true}
										onClick={() => {
											setValue(val);
										}}
									/>
								</IonRadioGroup>
							</IonCol>
						))}
					</IonRow>
				</IonGrid>
			</div>
		</div>
	);
};

export default OneToFiveSelector;
