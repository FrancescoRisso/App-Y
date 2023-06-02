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

import { useContext, useEffect, useMemo } from "react";
import { getGraphFieldsZeroValues } from "../../util";
import { IonCard, IonCardContent } from "@ionic/react";
import { AppContext } from "../AppContext";
import thumbsUp from "../../images/survey/thumbsUp.jpg";
import thumbsDown from "../../images/survey/thumbsDown.jpg";
import ReactSlider from "react-slider";

const Work = () => {
	const allContext = useContext(AppContext);
	const context = useMemo(
		() => allContext.storedValues.weeklySurveyValues.likeWhatYouDo,
		[allContext.storedValues.weeklySurveyValues.likeWhatYouDo]
	);

	const range = useMemo(() => 2, []);

	const min = useMemo(() => {
		return Object.assign(getGraphFieldsZeroValues(), { health: -range });
	}, [range]);

	const max = useMemo(() => {
		return Object.assign(getGraphFieldsZeroValues(), { health: range });
	}, [range]);

	const cur = useMemo(() => {
		return Object.assign(getGraphFieldsZeroValues(), { health: (range * (context.selected.val - 50)) / 50 });
	}, [range, context.selected.val]);

	useEffect(() => {
		context.values.set({ min, max, cur });
		// eslint-disable-next-line
	}, [context.values.set, min, max, cur]);

	const H = useMemo(
		() => -4 * (1 - context.selected.val / 100) + 1.06 * context.selected.val,
		[context.selected.val]
	);
	const S = useMemo(
		() => 79 * (1 - context.selected.val / 100) + 0.56 * context.selected.val,
		[context.selected.val]
	);
	const L = useMemo(
		() => 53 * (1 - context.selected.val / 100) + 0.44 * context.selected.val,
		[context.selected.val]
	);

	return (
		<IonCard color="white" className="mx-5 h-60-percent">
			<IonCardContent className="h-100-percent">
				<div className="h-90-percent center-vertically ion-text-center">
					<img className="h-15-percent" src={thumbsUp} alt="Molto" />
					<div className="h-70-percent py-4 ">
						<div className="h-100-percent ion-text-center">
							<div
								style={{ ["--slider-color" as any]: `hsl(${H}deg, ${S}%, ${L}%)` }}
								className="h-100-percent w-25-percent center-horizontally"
							>
								<ReactSlider
									className="my-slider w-100-percent mx-0"
									onChange={(e) => {
										context.selected.set(100 - e);
									}}
									trackClassName="my-slider-track"
									value={100 - context.selected.val}
									min={0}
									max={100}
									orientation="vertical"
									thumbClassName="my-slider-thumb"
								/>
							</div>
						</div>
					</div>
					<img className="h-15-percent" src={thumbsDown} alt="Niente" />
				</div>
			</IonCardContent>
		</IonCard>
	);
};

export default Work;
