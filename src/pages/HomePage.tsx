/*

description:
	
	
state:
	- 
	
hooks:
	- 
	
context:
	- 

*/

import { IonGrid, IonCol, IonRow, IonCard, IonCardContent, IonButton } from "@ionic/react";
import HomePageNavigation from "../components/HomePageSvgs/HomePageNavigation";
import Avatar from "../components/General_components/Avatar";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../components/AppContext";
import { Link } from "react-router-dom";

export interface HomePageProps {}

const HomePage = () => {
	const appContext = useContext(AppContext);

	const linkToUserDetails = useRef<HTMLAnchorElement>(null);

	useEffect(() => {
		appContext.loaders.loadAvatar();
	}, [appContext.loaders]);

	return (
		<IonGrid className="h-100-percent justify-content-vertically">
			<Link to="/PersonalInfoPage" ref={linkToUserDetails} />
			<IonRow>
				<IonCol>
					<HomePageNavigation />
					<div
						id="homepage-avatar-bar"
						onClick={() => {
							linkToUserDetails.current?.click();
						}}
					>
						<CircularProgressbar
							value={0.67}
							maxValue={1}
							styles={{ path: { stroke: "var(--ion-color-violet)" } }}
						/>
						<span id="homepage-avatar">
							<Avatar
								isDefault={appContext.storedValues.userAvatar.val === "default"}
								link="/personalInfoPage"
							/>
						</span>
					</div>
				</IonCol>
			</IonRow>
			<IonRow>
				<IonCard className="ios-no-vertical-margin">
					<IonCardContent>
						“This is your Monday reminder that you can handle whatever this week throws at you”
					</IonCardContent>
				</IonCard>
				<div className="w-100-percent ion-text-center">
					<IonButton color="main">Survey of the week</IonButton>
				</div>
			</IonRow>
		</IonGrid>
	);
};

export default HomePage;
