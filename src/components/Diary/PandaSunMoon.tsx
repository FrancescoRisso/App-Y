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

import PandaImg from "../General_components/PandaImg";

import sun from "../../images/diary/sun.png";
import moon from "../../images/diary/moon.png";
import { createRef, useEffect, useMemo } from "react";
import { CreateAnimation } from "@ionic/react";

export interface PandaSunMoonProps {
	type: "day" | "night";
	distance: number | string;
	startAnimation: boolean;
	duration: number;
}

const PandaSunMoon = ({ type, distance, startAnimation, duration }: PandaSunMoonProps) => {
	const allSceneHeight = useMemo(() => "100vw", []);
	const pandaHeight = useMemo(() => "48%", []);
	const placeholderHeightWithoutCalc = useMemo(() => `(100% - ${pandaHeight})/2`, [pandaHeight]);
	const placeholderHeight = useMemo(() => `calc(${placeholderHeightWithoutCalc})`, [placeholderHeightWithoutCalc]);
	const bgPandaProportion = useMemo(() => "42%", []);

	const visiblePositionTransform = useMemo(
		() => `translate(-50%, -50%) rotate(-135deg) translateX(${distance}) rotate(135deg)`,
		[distance]
	);
	const visiblePositionTransformDestination = useMemo(
		() => `translate(-50%, -50%) rotate(225deg) translateX(${distance}) rotate(-225deg)`,
		[distance]
	);
	const hiddenPositionTransform = useMemo(
		() => `translate(-50%, -50%) rotate(45deg) translateX(${distance}) rotate(-45deg)`,
		[distance]
	);

	const sunMoonGoingAway: React.RefObject<CreateAnimation> = createRef();
	const sunMoonEntering: React.RefObject<CreateAnimation> = createRef();
	const backgorundColorChange: React.RefObject<CreateAnimation> = createRef();

	useEffect(() => {
		if (startAnimation) {
			sunMoonGoingAway.current?.animation.play();
			sunMoonEntering.current?.animation.play();
			backgorundColorChange.current?.animation.play();
		}
	}, [sunMoonGoingAway, sunMoonEntering, backgorundColorChange, startAnimation]);

	return (
		<div style={{ height: allSceneHeight, position: "relative" }}>
			<div style={{ height: placeholderHeight }}></div>
			<CreateAnimation
				ref={sunMoonGoingAway}
				keyframes={[
					{ offset: 0, transform: visiblePositionTransform },
					{ offset: 1, transform: hiddenPositionTransform }
				]}
				duration={duration}
				afterClearStyles={["transform"]}
			>
				<img
					// The visible one
					src={type === "day" ? sun : moon}
					style={{
						position: "absolute",
						left: "50vw",
						top: "50%",
						transform: visiblePositionTransform
					}}
					alt=""
				/>
			</CreateAnimation>
			<CreateAnimation
				ref={sunMoonEntering}
				keyframes={[
					{ offset: 0, transform: hiddenPositionTransform },
					{ offset: 1, transform: visiblePositionTransformDestination }
				]}
				duration={duration}
			>
				<img
					// The hidden one
					src={type === "day" ? moon : sun}
					style={{
						position: "absolute",
						left: "50vw",
						top: "50%",
						transform: hiddenPositionTransform
					}}
					alt=""
				/>
			</CreateAnimation>
			<CreateAnimation
				ref={backgorundColorChange}
				keyframes={[
					{
						offset: 0,
						backgroundColor: `var(--ion-color-${type === "day" ? "white" : "night"})`,
						borderTop: `1px solid ${type === "day" ? "black" : "white"}`
					},
					{
						offset: 1,
						backgroundColor: `var(--ion-color-${type === "day" ? "night" : "white"})`,
						borderTop: `1px solid ${type === "day" ? "white" : "black"}`
					}
				]}
				duration={duration}
			>
				<div
					// Background cover
					style={{
						height: bgPandaProportion,
						width: "100vw",
						position: "absolute",
						top: `100%`,
						left: "50%",
						transform: "translate(-50%, -100%)",
						borderTop: `1px solid ${type === "day" ? "black" : "white"}`,
						backgroundColor: `var(--ion-color-${type === "day" ? "white" : "night"})`
					}}
				/>
			</CreateAnimation>
			<div style={{ height: pandaHeight }}>
				<PandaImg type="skateboard" height="100%" />
			</div>
		</div>
	);
};

export default PandaSunMoon;
