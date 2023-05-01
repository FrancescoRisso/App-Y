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

import {
	IonButton,
	IonButtons,
	IonContent,
	IonFooter,
	IonHeader,
	IonIcon,
	IonPage,
	IonTitle,
	IonToolbar
} from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import { useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export interface PageTemplateProps {
	pageContent: JSX.Element;
	header: string | JSX.Element;
	footer?: JSX.Element;
	prevPage?: string;
}

const PageTemplate = ({ pageContent, header, footer, prevPage }: PageTemplateProps) => {
	const prevPageRef = useRef<HTMLAnchorElement>(null);

	const goToPrevPage = useCallback(() => {
		prevPageRef.current?.click();
	}, [prevPageRef]);

	useEffect(() => {
		if (prevPage) {
			window.removeEventListener("ionBackButton", goToPrevPage);
			window.addEventListener("ionBackButton", goToPrevPage);
		}

		return () => {
			window.removeEventListener("ionBackButton", goToPrevPage);
		};
	}, [goToPrevPage, prevPage]);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					{typeof header === "string" ? <IonTitle>{header}</IonTitle> : header}
					{prevPage && (
						<IonButtons slot="start">
							<Link to={prevPage} ref={prevPageRef} />
							<IonButton
								onClick={() => {
									prevPageRef.current?.click();
								}}
							>
								<IonIcon slot="start" icon={arrowBackOutline} />
							</IonButton>
						</IonButtons>
					)}
				</IonToolbar>
			</IonHeader>
			<IonContent color="main-light">{pageContent}</IonContent>
			{footer && (
				<IonFooter>
					<IonToolbar color="main-light">{footer}</IonToolbar>
				</IonFooter>
			)}
		</IonPage>
	);
};

export default PageTemplate;
