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

import { IonContent, IonFooter, IonPage, IonSpinner, IonToolbar } from "@ionic/react";
import { appColors, pandaTypes } from "../types";
import TopPageTongue, { tongueTypes } from "../components/General_components/TopPageTongue";

export interface PageTemplateProps {
	pageContent: JSX.Element;
	footer?: JSX.Element;
	prevPage?: string;
	loading?: boolean;
	backgroundColor: appColors;
	header?: {
		type: tongueTypes;
		color: appColors;
		height: number | string;
		width?: number | string;
		panda?: pandaTypes;
		logout?: boolean;
		text: string;
		alignTextBottom?: boolean;
		leaveEmptyLines?: { top?: number; bottom?: number };
	};
}

const PageTemplate = ({ pageContent, footer, prevPage, loading, backgroundColor, header }: PageTemplateProps) => {
	return (
		<IonPage>
			<IonContent color={backgroundColor}>
				{header && (
					<TopPageTongue
						type={header.type}
						color={header.color ?? "violet"}
						height={header.height}
						width={header.width}
						panda={header.panda}
						prevPage={prevPage}
						text={header.text}
						alignTextBottom={header.alignTextBottom}
						leaveEmptyLines={header.leaveEmptyLines}
					/>
				)}
				<div style={{ height: header ? `calc(100% - ${header.height})` : "100%" }}>
					{loading ? (
						<div className="center-vertically ion-text-center">
							<IonSpinner />
						</div>
					) : (
						pageContent
					)}
				</div>
			</IonContent>
			{footer && (
				<IonFooter>
					<IonToolbar color={backgroundColor}>{footer}</IonToolbar>
				</IonFooter>
			)}
		</IonPage>
	);
};

export default PageTemplate;
