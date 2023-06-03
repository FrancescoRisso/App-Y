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

import { SwiperSlide, Swiper } from "swiper/react";
import trekking from "../images/goals/trekking.svg";
import strenghten from "../images/goals/strenghten.svg";
import gardening from "../images/goals/gardening.svg";
import meditation from "../images/goals/meditation.svg";
import running from "../images/goals/running.svg";
import { Keyboard, Pagination, Scrollbar, Zoom } from "swiper";
import {
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardTitle,
	IonCol,
	IonGrid,
	IonIcon,
	IonModal,
	IonPicker,
	IonRow
} from "@ionic/react";
import { useMemo, useState } from "react";
import { addCircleOutline } from "ionicons/icons";
import Input from "../components/General_components/Input";
import Button from "../components/General_components/Button";

export interface GoalsPageProps {}

const GoalsPage = () => {
	const swiperHeight = useMemo(() => 228, []);
	const swiperWidth = useMemo(() => 165, []);

	const images: Record<string, string> = useMemo(() => {
		return {
			Trekking: trekking,
			Rafforzarsi: strenghten,
			Meditazione: meditation,
			Corsa: running,
			Giardinaggio: gardening
		};
	}, []);

	const [title, setTitle] = useState<string>("");
	const [days, setDays] = useState<number>(0);
	const [hours, setHours] = useState<number>(0);
	const [mins, setMins] = useState<number>(0);
	const [modalOpened, setModalOpened] = useState<boolean>(false);
	const [rangeOpened, setRangeOpened] = useState<boolean>(false);

	return (
		<div className="h-100-percent">
			<IonModal
				isOpen={modalOpened}
				initialBreakpoint={1}
				breakpoints={[0, 1]}
				onIonModalDidDismiss={() => {
					setModalOpened(false);
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
											// TODO add goal
											setModalOpened(false);
										}}
									/>
								</IonCol>
								<IonCol>
									<Button
										color="danger"
										fontSize="app"
										text="Annulla"
										action={() => {
											setModalOpened(false);
										}}
									/>
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
			<div className="h-20-percent" style={{ position: "relative", bottom: "30%" }}>
				<Swiper
					slidesPerView={2}
					centeredSlides={true}
					spaceBetween={20}
					direction="horizontal"
					modules={[Keyboard, Pagination, Scrollbar, Zoom]}
					initialSlide={2}
				>
					{["Trekking", "Rafforzarsi", "Custom", "Meditazione", "Corsa", "Giardinaggio"].map((activity) => (
						<SwiperSlide key={activity}>
							<div className="pb-2 center-horizontally" style={{ width: swiperWidth }}>
								<IonCard
									className="m-0 with-shadow h-100-percent"
									color="white"
									style={{ height: swiperHeight }}
									onClick={() => {
										setTitle(activity === "Custom" ? "" : activity);
										setDays(0);
										setHours(0);
										setMins(0);
										setModalOpened(true);
									}}
								>
									{activity === "Custom" ? (
										<IonCardContent className="center-vertically">
											<h1 className="ion-text-center">
												<b>Crea il tuo obbiettivo</b>
											</h1>
											<br />
											<div className="ion-text-center">
												<IonIcon
													icon={addCircleOutline}
													color="violet"
													style={{ fontSize: "500%" }}
												/>
											</div>
										</IonCardContent>
									) : (
										<IonCardContent className="p-0">
											<img
												src={images[activity]}
												alt={activity}
												height={swiperHeight}
												style={{ overflow: "visible" }}
											/>
										</IonCardContent>
									)}
								</IonCard>
							</div>
						</SwiperSlide>
					))}
					<SwiperSlide className="h-100-percent"></SwiperSlide>
				</Swiper>
			</div>
			<div>Ciao</div>
		</div>
	);
};

export default GoalsPage;
