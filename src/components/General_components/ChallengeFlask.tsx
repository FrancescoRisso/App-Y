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
import SpeechBubble from "./SpeechBubble";
import { Redirect } from "react-router";

export interface ChallengeFlaskProps {
	ormonName: string;
	imagePath: string;
	symptoms: string[];
	link: string;
}

const ChallengeFlask = ({ ormonName, imagePath, symptoms, link }: ChallengeFlaskProps) => {
	const [redirect, setRedirect] = useState<boolean>(false);

	if (redirect) return <Redirect to={link} />;
	return (
		<div
			onClick={() => {
				setRedirect(true);
			}}
		>
			<SpeechBubble
				content={
					<>
						<h2>Se ti senti:</h2>
						<ul className="no-vertical-margin">
							{symptoms.map((symptom, index) => (
								<li key={index}>{symptom}</li>
							))}
						</ul>
					</>
				}
			/>
			<h1 className="ion-text-center no-vertical-margin">{ormonName}</h1>
			<div className="ion-text-center">
				<img src={imagePath} alt="" width="40%" className="ion-margin-top" />
			</div>
		</div>
	);
};

export default ChallengeFlask;
