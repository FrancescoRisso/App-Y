/*

description:
	
	
state:
	- 
	
hooks:
	- 
	
context:
	- 

*/

import { IonGrid, IonCol, IonRow, IonCard, IonCardContent } from "@ionic/react";
import HomePageNavigation from "../components/HomePageSvgs/HomePageNavigation";
import Avatar from "../components/General_components/Avatar";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../components/AppContext";
import { Link } from "react-router-dom";
import Button from "../components/General_components/Button";

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
				<IonCard className="ios-no-vertical-margin with-shadow" color="violet">
					<IonCardContent>
						<p className="py-2 px-2 ion-text-center font-size-app">
							“Ricordati che puoi gestire qualsiasi ostacolo che ti sarà posto davanti questa settimana”
						</p>
					</IonCardContent>
				</IonCard>
				<div className="w-100-percent ion-text-center mt-4">
					<div className="mx-as-card">
						<Button color="night" fontSize="app" text="Survey settimanale" noMargin link="/survey" />
					</div>
				</div>
			</IonRow>
		</IonGrid>
	);
};

export default HomePage;
