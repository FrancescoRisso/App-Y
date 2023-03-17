/*

description:
	Panda welcomes you
	
state:

hooks:

context:
	
*/

import { IonCard, IonCardContent } from "@ionic/react";
import { RegisterComponentProps } from "../../types";
import { useEffect } from "react";

const Welcome = ({ canProceed, setCanProceed }: RegisterComponentProps) => {
	// useEffect(() => {
	// 	if (!canProceed) {
	// 		console.debug("setCanProceed true - welcome page is ok");
	// 		setCanProceed(true);
	// 	}
	// }, [canProceed, setCanProceed]);

	// useEffect(()=>{
	// 	console.log("Ciao");
	// }, [])

	return (
		<IonCard>
			<IonCardContent>Test</IonCardContent>
		</IonCard>
	);
};

export default Welcome;
