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
import { AppContext } from "../components/AppContext";
import LoadingPage from "./LoadingPage";
import DiaryDay from "../components/Diary/DiaryDay";
import PageTemplate from "./PageTemplate";
import DiaryNight from "../components/Diary/DiaryNight";

export interface DiaryPageManagementProps {}

const DiaryPageManagement = () => {
	const [pageType, setPageType] = useState<"morning" | "evening" | null>(null);

	const context = useContext(AppContext);

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

	const animationDuration = useMemo(() => 1000, []);
	const sunMoonDistance = useMemo(() => "38vw", []);

	const color = useMemo(() => (pageType === "morning" ? "white" : "night"), [pageType]);

	if (pageType === null) return <LoadingPage prevPage="/home" />;

	return (
		<PageTemplate
			backgroundColor={color}
			header={{ color, height: "25vw", text: "", type: "rectangle" }}
			pageContent={
				pageType === "morning" ? (
					<DiaryDay
						switchTime={async () => {
							setPageType("evening");
						}}
						animationDuration={animationDuration}
						sunMoonDistance={sunMoonDistance}
					/>
				) : (
					<DiaryNight
						switchTime={async () => {
							setPageType("morning");
						}}
						animationDuration={animationDuration}
						sunMoonDistance={sunMoonDistance}
					/>
				)
			}
			prevPage="/home"
		/>
	);
};

export default DiaryPageManagement;
