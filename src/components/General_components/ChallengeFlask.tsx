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

import { useState } from "react";
import { Redirect } from "react-router";
import emptyFlask from "../../images/challenge/emptyFlask.svg";
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from "@ionic/react";
import { ormons } from "../../types";
import { getOrmonName } from "../../util";

export interface ChallengeFlaskProps {
	ormon: ormons;
	filled?: boolean;
	symptoms: string[];
	filledIcon: string;
}

const ChallengeFlask = ({ ormon, filled, symptoms, filledIcon }: ChallengeFlaskProps) => {
	const [redirect, setRedirect] = useState<boolean>(false);

	if (redirect) return <Redirect to={`/challenge/${ormon}`} />;
	return (
		<div
			onClick={() => {
				setRedirect(true);
			}}
		>
			<IonCard color="white" className="mx-5">
				<IonCardHeader>
					<IonCardTitle>Se ti senti:</IonCardTitle>
				</IonCardHeader>
				<IonCardContent>
					<ul className="mt-0 mb-3">
						{symptoms.map((symptom, index) => (
							<li className="font-size-app" key={index}>
								{symptom}
							</li>
						))}
					</ul>
					<div className="ion-text-center">
						<h1>Hai bisogno di stimolare la tua {getOrmonName(ormon)}!</h1>
						<img src={filled ? filledIcon : emptyFlask} alt="" width="50%" className="ion-margin-top" />
					</div>
				</IonCardContent>
			</IonCard>
		</div>
	);
};

export default ChallengeFlask;
