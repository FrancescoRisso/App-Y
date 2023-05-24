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

import { IonIcon } from "@ionic/react";
import { appColors, diaryActivities } from "../../types";
import { activityIcons, activityNames } from "../../util";
import { CircularProgressbar } from "react-circular-progressbar";

export interface SingleActivityProps {
	activity: diaryActivities;
	selected: boolean;
	mainColor: appColors;
	invertSelection: () => void;
}

const SingleActivity = ({ activity, selected, mainColor, invertSelection }: SingleActivityProps) => {
	return (
		<div className="ion-text-center">
			<div className="w-100-percent pos-relative" onClick={invertSelection}>
				<div className="diary-icon ion-text-center">
					{activityIcons[activity].startsWith("/static") ? (
						<img src={activityIcons[activity]} className="ionicon-full-size" alt="" />
					) : (
						<IonIcon icon={activityIcons[activity]} className="ionicon-full-size" />
					)}
				</div>
				<span>
					<CircularProgressbar
						value={selected ? 1 : 0}
						maxValue={1}
						styles={{ path: { stroke: `var(--ion-color-${mainColor})` } }}
					/>
				</span>
			</div>
			<p className="m-0 break-word">{activityNames[activity]}</p>
		</div>
	);
};

export default SingleActivity;
