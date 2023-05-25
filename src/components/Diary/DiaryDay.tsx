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
import ActivitesDisplay from "./ActivitesDisplay";
import { diaryActivities, diaryActivitiesList } from "../../types";
import Button from "../General_components/Button";
import API from "../../api";

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
		context.loaders.loadActivities();
	}, [context]);

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

	const [selectedActivities, setSelectedActivities] = useState<diaryActivities[]>([]);

	useEffect(() => {
		if (typeof context.storedValues.activities.val !== "string")
			setSelectedActivities(context.storedValues.activities.val);
	}, [context.storedValues]);

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

			<ActivitesDisplay
				activities={diaryActivitiesList as unknown as diaryActivities[]}
				mainColor="violet"
				title="Scegli delle attività per oggi:"
				disabled={context.storedValues.activities.val !== "notSelected"}
				selected={selectedActivities}
				setSelected={setSelectedActivities}
			/>

			<Button
				color="violet"
				fontSize="app"
				text={
					context.storedValues.activities.val === "notSelected"
						? "Conferma attività per oggi"
						: "Attività per oggi confermate"
				}
				action={async () => {
					API.setActivities({
						userID: await context.storage.getValue("userID"),
						activities: selectedActivities
					});
					context.storedValues.activities.set(selectedActivities);
				}}
				disabled={context.storedValues.activities.val !== "notSelected"}
			/>
		</>
	);
};

export default DiaryNight;
