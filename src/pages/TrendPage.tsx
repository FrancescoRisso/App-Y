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

import { useContext, useEffect } from "react";
import { AppContext } from "../components/AppContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { graphFields, graphFieldsList } from "../types";

import RadarChart from "../components/Trend/RadarChart";
import { graphFieldsNames } from "../util";
import TrendCard from "../components/Trend/TrendCard";

import { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from "swiper";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/keyboard";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/zoom";

export interface TrendPageProps {}

const TrendPage = () => {
	const context = useContext(AppContext);

	useEffect(() => {
		context.loaders.loadScores();
	}, [context.loaders]);

	return (
		<Swiper
			slidesPerView={1}
			spaceBetween={50}
			className="pos-relative h-100-percent"
			direction="horizontal"
			modules={[Keyboard, Pagination, Scrollbar, Zoom]}
		>
			<SwiperSlide className="h-100-percent">
				<TrendCard
					graphType="general"
					page={0}
					graph={
						typeof context.storedValues.userScores.val === "string" ? undefined : (
							<RadarChart
								data={[
									{
										values: (graphFieldsList as unknown as graphFields[]).map((field) =>
											typeof context.storedValues.userScores.val === "string"
												? 0
												: context.storedValues.userScores.val[field]
										),
										name: "prova",
										strokeWidth: 0.7,
										color: "var(--ion-color-violet)"
									}
								]}
								labels={(graphFieldsList as unknown as graphFields[]).map(
									(field) => graphFieldsNames[field]
								)}
								options={{
									strokeColor: "#aaa",
									fontSize: 5,
									numTicks: 4
								}}
							/>
						)
					}
				/>
			</SwiperSlide>
			<SwiperSlide className="h-100-percent">
				<TrendCard graphType="humor" page={1} />
			</SwiperSlide>
		</Swiper>
	);
};

export default TrendPage;
