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

import {
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardTitle,
	IonCol,
	IonGrid,
	IonProgressBar,
	IonRow
} from "@ionic/react";
import moment from "moment";
import { Moment } from "moment";
import { useCallback, useMemo, useState, useEffect } from "react";
import Button from "../General_components/Button";

export interface PendingGoalProps {
	removeMe: () => void;
	title: string;
	start: Moment;
	end: Moment;
}

const PendingGoal = ({ end, removeMe, start, title }: PendingGoalProps) => {
	const totTime = useMemo(() => end.diff(start, "milliseconds"), [end, start]);
	const onePercTime = useMemo(() => totTime / 100, [totTime]);

	const [now, setNow] = useState<moment.Moment>(moment());

	const remainingTime = useMemo(() => end.diff(now, "milliseconds"), [end, now]);
	const remainingWeeks = useMemo(() => end.diff(now, "weeks"), [end, now]);
	const remainingDays = useMemo(() => end.diff(now, "days"), [end, now]);
	const remainingHours = useMemo(() => end.diff(now, "hours"), [end, now]);
	const remainingMins = useMemo(() => end.diff(now, "minutes"), [end, now]);
	const remainingSecs = useMemo(() => end.diff(now, "seconds"), [end, now]);

	const perc = useMemo(() => remainingTime / onePercTime, [remainingTime, onePercTime]); // 0 - 100

	const recalc = useCallback(() => {
		setNow(moment());
	}, []);

	useEffect(() => {
		const id = setInterval(recalc, onePercTime);
		return () => {
			clearInterval(id);
		};
	}, [onePercTime, recalc]);

	useEffect(() => {
		if (remainingWeeks === 0 && remainingDays === 0 && remainingHours === 0) {
			const id = setInterval(recalc, 1 * 60 * 1000); // every minute
			return () => {
				clearInterval(id);
			};
		}
	}, [remainingWeeks, remainingDays, remainingHours, recalc]);

	useEffect(() => {
		if (remainingWeeks === 0 && remainingDays === 0 && remainingHours === 0 && remainingMins === 0) {
			const id = setInterval(recalc, 1 * 1000); // every second
			return () => {
				clearInterval(id);
			};
		}
	}, [remainingWeeks, remainingDays, remainingHours, remainingMins, recalc]);

	useEffect(() => {
		if (remainingTime <= 0) removeMe();
	}, [remainingTime, removeMe]);

	const remainingString = useMemo(() => {
		if (remainingWeeks !== 0)
			return `${remainingWeeks} settiman${remainingWeeks === 1 ? "a" : "e"} rimast${
				remainingWeeks === 1 ? "a" : "e"
			}`;

		if (remainingDays > 1)
			return `${remainingDays} giorn${remainingDays === 1 ? "o" : "i"} rimast${remainingDays === 1 ? "o" : "i"}`;

		if (remainingHours !== 0)
			return `${remainingHours} or${remainingHours === 1 ? "a" : "e"} rimast${remainingHours === 1 ? "a" : "e"}`;

		if (remainingMins !== 0)
			return `${remainingMins} minut${remainingMins === 1 ? "o" : "i"} rimast${remainingMins === 1 ? "o" : "i"}`;

		return `${remainingSecs} second${remainingSecs === 1 ? "o" : "i"} rimast${remainingSecs === 1 ? "o" : "i"}`;
	}, [remainingWeeks, remainingDays, remainingHours, remainingMins, remainingSecs]);

	return (
		<IonCard className="with-shadow my-4">
			<IonCardHeader>
				<IonCardTitle className="pt-2">{title}</IonCardTitle>
			</IonCardHeader>
			<IonCardContent>
				<p>{remainingString}</p>
				<IonProgressBar value={perc / 100} color="violet" className="my-progress-bar" />
				<IonGrid>
					<IonRow>
						<IonCol size="5">
							<Button color="night" fontSize="smaller" text="Completato" action={removeMe} shorter />
						</IonCol>
						<IonCol size="5" push="2">
							<Button color="violet" fontSize="smaller" text="Rimuovi" action={removeMe} shorter />
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonCardContent>
		</IonCard>
	);
};

export default PendingGoal;
