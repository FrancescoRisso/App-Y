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
import { diaryActivities } from "../../types";
import Button from "../General_components/Button";

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

	useEffect(() => {
		context.loaders.loadActivities();
	}, [context.loaders]);

	const [howWasDay, setHowWasDay] = useState<number>(0);
	const [completedActivities, setCompletedActivities] = useState<diaryActivities[]>([]);

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

			<OneToFiveSelector
				setValue={setHowWasDay}
				title="Com'è andata la giornata?"
				value={howWasDay}
				color="night"
			/>

			<ActivitesDisplay
				activities={
					typeof context.storedValues.activities.val !== "string" ? context.storedValues.activities.val : []
				}
				mainColor="violet"
				selected={completedActivities}
				setSelected={setCompletedActivities}
				title={
					typeof context.storedValues.activities.val !== "string"
						? "Seleziona le attività che hai completato:"
						: "Non hai selezionato nessuna attività per oggi"
				}
				iconColor="light"
			/>

			<Button
				color="white"
				fontSize="app"
				text="Conferma attività svolte oggi"
				action={async () => {
					// API.setActivities({
					// 	userID: await context.storage.getValue("userID"),
					// 	activities: selectedActivities
					// });
					//context.storedValues.activities.set(selectedActivities);
				}}
			/>
			<div className="py-2" />
		</>
	);
};

export default DiaryNight;
