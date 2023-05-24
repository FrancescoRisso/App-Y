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
import { createRef, useContext, useEffect, useState } from "react";
import BackgroundColorAnimation from "./BackgroundColorAnimation";
import ImageAndSwitch from "./ImageAndSwitch";
import OneToFiveSelector from "./OneToFiveSelector";
import { AppContext } from "../AppContext";

export interface DiaryNightProps {
	switchTime: () => void;
	animationDuration: number;
	sunMoonDistance: number | string;
}

const DiaryNight = ({ switchTime, animationDuration, sunMoonDistance }: DiaryNightProps) => {
	const context = useContext(AppContext);

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

	const [sleepVal, setSleepVal] = useState<number>(0);
	const [motivation, setMotivation] = useState<number>(0);

	return (
		<>
			{animating && (
				<BackgroundColorAnimation
					animationDuration={animationDuration}
					initialColor="var(--ion-color-white)"
					finalColor="var(--ion-color-night)"
					animationRef={backgroundColorChange}
				/>
			)}

			<ImageAndSwitch
				animating={animating}
				time="day"
				pandaSunMoon={
					<PandaSunMoon
						type="day"
						distance={sunMoonDistance}
						startAnimation={animating}
						duration={animationDuration}
					/>
				}
				startAnimating={() => {
					setAnimating(true);
				}}
			/>

			<OneToFiveSelector setValue={setSleepVal} title="Come hai dormito?" value={sleepVal} />
			<OneToFiveSelector
				setValue={setMotivation}
				title={`Quanto ti senti motivat${context.getGenderTerminations()}?`}
				value={motivation}
			/>

			
		</>
	);
};

export default DiaryNight;
