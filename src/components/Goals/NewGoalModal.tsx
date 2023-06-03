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
	IonModal,
	IonCard,
	IonCardHeader,
	IonCardTitle,
	IonCardContent,
	IonGrid,
	IonRow,
	IonCol,
	IonPicker
} from "@ionic/react";
import Button from "../General_components/Button";
import Input from "../General_components/Input";
import { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../AppContext";
import moment from "moment";

export interface NewGoalModalProps {
	opened: boolean;
	close: () => void;
	initialTitle: string;
}

const NewGoalModal = ({ opened, close, initialTitle }: NewGoalModalProps) => {
	const [title, setTitle] = useState<string>("");
	const [days, setDays] = useState<number>(0);
	const [hours, setHours] = useState<number>(0);
	const [mins, setMins] = useState<number>(0);
	const [rangeOpened, setRangeOpened] = useState<boolean>(false);

	useEffect(() => {
		setTitle(initialTitle);
	}, [initialTitle]);

	const allContext = useContext(AppContext);
	const goals = useMemo(() => allContext.storedValues.goals, [allContext.storedValues.goals]);

	return (
		<IonModal
			isOpen={opened}
			initialBreakpoint={1}
			breakpoints={[0, 1]}
			onIonModalDidDismiss={close}
			onIonModalWillPresent={() => {
				setDays(0);
				setHours(0);
				setMins(0);
			}}
			style={{ ["--height" as any]: "auto" }}
		>
			<IonCard color="violet">
				<IonCardHeader>
					<IonCardTitle className="font-size-bigger ion-text-center">
						Definisci un nuovo obbiettivo:
					</IonCardTitle>
				</IonCardHeader>
				<IonCardContent>
					<Input label="Nome attività" onInputAction={(val) => setTitle(val)} type="text" value={title} />
					<br />
					<Button
						color="grey"
						fontSize="app"
						text={
							days === 0 && hours === 0 && mins === 0
								? "Durata"
								: `${days} giorni, ${hours} ore, ${mins} minuti (cambia)`
						}
						action={() => setRangeOpened(true)}
					/>
					<IonGrid>
						<IonRow>
							<IonCol>
								<Button
									color="success"
									fontSize="app"
									text="Conferma"
									disabled={(days === 0 && hours === 0 && mins === 0) || title === ""}
									action={() => {
										goals.set([
											...goals.val,
											{
												title,
												startTime: moment(),
												endTime: moment()
													.add(days, "days")
													.add(hours, "hours")
													.add(mins, "minutes")
											}
										]);
										close();
									}}
								/>
							</IonCol>
							<IonCol>
								<Button color="danger" fontSize="app" text="Annulla" action={close} />
							</IonCol>
						</IonRow>
					</IonGrid>
					<IonPicker
						isOpen={rangeOpened}
						onDidDismiss={() => {
							setRangeOpened(false);
						}}
						columns={[
							{
								name: "days",
								prefix: "Giorni:",
								selectedIndex: days,
								options: Array.from({ length: 366 }, (_, i) => i).map((num) => {
									return { text: `${num}` };
								})
							},
							{
								name: "hours",
								prefix: "Ore:",
								selectedIndex: hours,
								options: Array.from({ length: 24 }, (_, i) => i).map((num) => {
									return { text: `${num}` };
								})
							},
							{
								name: "mins",
								prefix: "Minuti:",
								selectedIndex: mins,
								options: Array.from({ length: 60 }, (_, i) => i).map((num) => {
									return { text: `${num}` };
								})
							}
						]}
						buttons={[
							{
								text: "Conferma",
								role: "confirm",
								handler: (value) => {
									setDays(parseInt(value.days.text));
									setHours(parseInt(value.hours.text));
									setMins(parseInt(value.mins.text));
								}
							},
							{ text: "Annulla", role: "cancel" }
						]}
					/>
				</IonCardContent>
			</IonCard>
		</IonModal>
	);
};

export default NewGoalModal;
