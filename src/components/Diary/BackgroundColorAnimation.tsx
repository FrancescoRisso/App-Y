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

import { CreateAnimation } from "@ionic/react";

export interface BackgroundColorAnimationProps {
	animationDuration: number;
	initialColor: string;
	finalColor: string;
	animationRef: React.RefObject<CreateAnimation>;
}

const BackgroundColorAnimation = ({
	animationDuration,
	initialColor,
	finalColor,
	animationRef
}: BackgroundColorAnimationProps) => {
	return (
		<CreateAnimation
			ref={animationRef}
			keyframes={[
				{ offset: 0, backgroundColor: initialColor },
				{ offset: 1, backgroundColor: finalColor }
			]}
			duration={animationDuration}
		>
			<div
				style={{
					height: "100vh",
					width: "100vw",
					position: "absolute",
					top: 0,
					left: 0,
					backgroundColor: initialColor
				}}
			/>
		</CreateAnimation>
	);
};

export default BackgroundColorAnimation;
