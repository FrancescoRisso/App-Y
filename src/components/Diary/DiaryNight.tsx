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
import PandaSunMoon from "./PandaSunMoon";
import { createRef, useEffect, useState } from "react";
import BackgroundColorAnimation from "./BackgroundColorAnimation";
import ImageAndSwitch from "./ImageAndSwitch";

export interface DiaryNightProps {
	switchTime: () => void;
	animationDuration: number;
	sunMoonDistance: number | string;
}

const DiaryNight = ({ switchTime, animationDuration, sunMoonDistance }: DiaryNightProps) => {
	const backgroundColorChange: React.RefObject<CreateAnimation> = createRef();

	const [animating, setAnimating] = useState<boolean>(false);

	useEffect(() => {
		const f = async () => {
			if (animating) {
				await backgroundColorChange.current?.animation.play();
				setAnimating(false);
				switchTime();
			}
		};
		f();
	}, [animating, backgroundColorChange, setAnimating, switchTime]);

	return (
		<>
			{animating && (
				<BackgroundColorAnimation
					animationDuration={animationDuration}
					initialColor="var(--ion-color-night)"
					finalColor="var(--ion-color-white)"
					animationRef={backgroundColorChange}
				/>
			)}
			<ImageAndSwitch
				animating={animating}
				time="night"
				pandaSunMoon={
					<PandaSunMoon
						type="night"
						distance={sunMoonDistance}
						startAnimation={animating}
						duration={animationDuration}
					/>
				}
				startAnimating={() => {
					setAnimating(true);
				}}
			/>
		</>
	);
};

export default DiaryNight;
