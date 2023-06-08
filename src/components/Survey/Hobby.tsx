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

import { useContext, useEffect, useMemo, useState } from "react";
import { graphFields } from "../../types";
import { getGraphFieldsZeroValues } from "../../util";
import { IonCard, IonCardContent, IonIcon } from "@ionic/react";
import { AppContext } from "../AppContext";
import { SwiperSlide, Swiper } from "swiper/react";
import { Keyboard, Pagination, Scrollbar, Zoom } from "swiper";
import { thumbsDownOutline, thumbsUpOutline } from "ionicons/icons";
import creativity from "../../images/survey/creativity.svg";
import sport from "../../images/survey/sport.svg";
import culture from "../../images/survey/culture.svg";
import meditation from "../../images/survey/meditation.svg";
import gardening from "../../images/survey/gardening.svg";
import cinema from "../../images/survey/cinema.svg";
import travel from "../../images/survey/travel.svg";
import play from "../../images/survey/play.svg";

const Hobby = () => {
	const [hobbyNo, setHobbyNo] = useState<number>(0);

	const options: string[] = useMemo(
		() => [culture, meditation, creativity, gardening, cinema, travel, sport, play],
		[]
	);

	const allContext = useContext(AppContext);
	const context = useMemo(
		() => allContext.storedValues.weeklySurveyValues.hobbies,
		[allContext.storedValues.weeklySurveyValues.hobbies]
	);

	const min: Record<graphFields, number> = useMemo(() => {
		return getGraphFieldsZeroValues();
	}, []);

	const max = useMemo(() => {
		return Object.assign(getGraphFieldsZeroValues(), { passion: options.length });
	}, [options]);

	const cur = useMemo(() => {
		return Object.assign(getGraphFieldsZeroValues(), { passion: context.selected.val });
	}, [context.selected.val]);

	useEffect(() => {
		context.values.set({ min, max, cur });
		//eslint-disable-next-line
	}, [min, max, cur, context.values.set]);

	return (
		<Swiper
			className="h-60-percent mx-5 w-100-percent"
			slidesPerView={1.3}
			centeredSlides={true}
			spaceBetween={10}
			direction="horizontal"
			modules={[Keyboard, Pagination, Scrollbar, Zoom]}
			initialSlide={1}
			onActiveIndexChange={(swiper) => {
				const index = swiper.activeIndex;
				if (index === 1 || hobbyNo === options.length) return;
				if (index === 0) context.selected.set(context.selected.val + 1);
				setHobbyNo(hobbyNo + 1);
				swiper.slideTo(1);
			}}
			onScroll={(swiper, event) => console.debug(swiper, event)}
		>
			{hobbyNo < options.length && (
				<SwiperSlide className="h-60-percent py-2 ion-text-right">
					<IonCard color="success" className="h-60-percent my-0 center-vertically w-50-percent align-right">
						<IonCardContent className="h-100-percent p-0 ion-text-center">
							<IonIcon
								icon={thumbsUpOutline}
								style={{ fontSize: "10vh" }}
								className="center-vertically"
							/>
						</IonCardContent>
					</IonCard>
				</SwiperSlide>
			)}

			<SwiperSlide className="w-100-percent h-100-percent py-2">
				<IonCard color="white" className="h-100-percent my-0">
					<IonCardContent className="h-100-percent p-0">
						{hobbyNo !== options.length ? (
							<img src={options[hobbyNo]} alt="" width="100%" />
						) : (
							<p className="font-size-app px-3 ion-text-center center-vertically">
								Hobbies terminati, puoi proseguire con la prossima domanda!
							</p>
						)}
					</IonCardContent>
				</IonCard>
			</SwiperSlide>

			{hobbyNo < options.length && (
				<SwiperSlide className="w-100-percent h-60-percent py-2">
					<IonCard color="danger" className="h-60-percent my-0 center-vertically w-50-percent">
						<IonCardContent className="h-100-percent p-0 ion-text-center">
							<IonIcon
								icon={thumbsDownOutline}
								style={{ fontSize: "10vh" }}
								className="center-vertically"
							/>
						</IonCardContent>
					</IonCard>
				</SwiperSlide>
			)}
		</Swiper>
	);
};

export default Hobby;
