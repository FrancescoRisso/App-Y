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

import { createRef, useContext, useEffect, useState } from "react";
import { AppContext } from "../components/AppContext";
import LoadingPage from "./LoadingPage";
import { CreateAnimation, IonButton } from "@ionic/react";

export interface DiaryPageManagementProps {}

const DiaryPageManagement = () => {
	const [pageType, setPageType] = useState<"morning" | "evening" | null>(null);

	const context = useContext(AppContext);
	const animation: React.RefObject<CreateAnimation> = createRef();

	useEffect(() => {
		const f = async () => {
			setPageType(null);
			if (context.storage.isOk) {
				const lastMode = await context.storage.getValue("diaryMode");
				if (lastMode === null) setPageType("morning");
				else setPageType(lastMode);
			}
		};
		f();
	}, [context.storage]);

	switch (pageType) {
		case "evening":
		case "morning":
			return (
				<>
					<CreateAnimation
						duration={1000}
						ref={animation}
						keyframes={[
							{ offset: 0, color: "white" },
							{ offset: 0.5, transform: "translateX(100px)", color: "black" },
							{ offset: 1, transform: "translateX(200px)", color: "white" }
						]}
					>
						<IonButton
							onClick={() => {
								animation.current!.animation.play();
							}}
						>
							Ciao
						</IonButton>
					</CreateAnimation>
				</>
			);
		case null:
			return <LoadingPage prevPage="/home" />;
	}
};

export default DiaryPageManagement;
