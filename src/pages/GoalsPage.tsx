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

import { Swiper, SwiperSlide } from "swiper/react";
import trekking from "../images/goals/trekking.svg";
import strenghten from "../images/goals/strenghten.svg";
import gardening from "../images/goals/gardening.svg";
import meditation from "../images/goals/meditation.svg";
import running from "../images/goals/running.svg";
import { Keyboard, Pagination, Scrollbar, Zoom } from "swiper";
import { useContext, useMemo, useState } from "react";

import NewGoalModal from "../components/Goals/NewGoalModal";
import ProposedGoal from "../components/Goals/ProposedGoal";
import { AppContext } from "../components/AppContext";
import PendingGoal from "../components/Goals/PendingGoal";
import { goalType } from "../types";

export interface GoalsPageProps {}

const GoalsPage = () => {
	const swiperHeight = useMemo(() => 228, []);
	const swiperWidth = useMemo(() => 165, []);

	const context = useContext(AppContext);
	const goals = useMemo(() => context.storedValues.goals, [context.storedValues.goals]);

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
	const [modalOpened, setModalOpened] = useState<boolean>(false);

	return (
		<div className="h-100-percent">
			<NewGoalModal
				close={() => {
					setModalOpened(false);
				}}
				initialTitle={title}
				opened={modalOpened}
			/>
			<div className="h-15-percent" style={{ position: "relative", bottom: "30%" }}>
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
							<ProposedGoal
								activity={activity}
								openModal={() => {
									setModalOpened(true);
								}}
								setTitle={setTitle}
								swiperHeight={swiperHeight}
								swiperWidth={swiperWidth}
								image={images[activity]}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
			<h1 className="ion-text-center mt-4">I tuoi obbiettivi:</h1>
			<div className="pb-1">
				{goals.val.length === 0 ? (
					<p>
						<i className="ml-3">Non hai obbiettivi al momento</i>
					</p>
				) : (
					goals.val.map((goal, index) => (
						<PendingGoal
							end={goal.endTime}
							removeMe={() => {
								goals.set(goals.val.filter((g: goalType) => g !== goal));
							}}
							start={goal.startTime}
							title={goal.title}
							key={index}
						/>
					))
				)}
			</div>
		</div>
	);
};

export default GoalsPage;
