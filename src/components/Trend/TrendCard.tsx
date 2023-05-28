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

import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from "@ionic/react";
import { useMemo } from "react";
import { SwiperSlide } from "swiper/react";

export type TrendCardProps = {
	page: number;
	graphType: "general" | "humor";
	graph?: JSX.Element;
};

const TrendCard = ({ page, graphType, graph }: TrendCardProps) => {
	const numPages = useMemo(() => 2, []);

	const smallCircleSize = useMemo(() => 4, []);
	const bigCircleSize = useMemo(() => 7, []);
	const interSpace = useMemo(() => 4, []);

	const title = useMemo(() => {
		switch (graphType) {
			case "general":
				return "In generale";
			case "humor":
				return "Umore";
		}
	}, [graphType]);

	const description = useMemo(() => {
		switch (graphType) {
			case "general":
				return "Questo grafico mostra quanto l'app ti percepisce forte nelle categorie indicate.";
			case "humor":
				return "Qui puoi vedere com'è stato l'andamento del tuo umore negli scorsi giorni.";
		}
	}, [graphType]);

	const missingData = useMemo(() => {
		switch (graphType) {
			case "general":
				return 'Completa almeno una "survey of the week" per avere dei dati da vedere.';
			case "humor":
				return 'Completa almeno una "survey giornaliera" per avere dei dati da vedere.';
		}
	}, [graphType]);

	return (
		<IonCard color="grey" className="my-0 h-90-percent center-vertically mx-4 with-shadow">
			<IonCardHeader className="h-10-percent py-0">
				<IonCardTitle className="ion-text-center font-size-even-bigger center-vertically">{title}</IonCardTitle>
			</IonCardHeader>
			<IonCardContent className="h-90-percent">
				<div className="h-100-percent justify-content-vertically">
					{graph ? (
						<>
							{graph}
							<p className="my-0 font-size-app">{description}</p>
						</>
					) : (
						<>
							<div></div>
							<div>
								<p className="my-auto font-size-app">Sembra non ci siano dati da mostrarti...</p>
								<p className="my-auto font-size-app">{missingData}</p>
							</div>
						</>
					)}
					<svg
						preserveAspectRatio="xMidYMid meet"
						width="100%"
						height="1.2vh"
						viewBox={`0 0 ${(numPages + 1) * interSpace + 2 * numPages * bigCircleSize} ${
							2 * bigCircleSize
						}`}
					>
						{Array.from({ length: numPages }).map((_, index) => (
							<circle
								fill="grey"
								key={index}
								r={index === page ? bigCircleSize : smallCircleSize}
								cy={bigCircleSize}
								cx={(index + 1) * interSpace + (2 * index + 1) * bigCircleSize}
							/>
						))}
					</svg>
				</div>
			</IonCardContent>
		</IonCard>
	);
};

export default TrendCard;
