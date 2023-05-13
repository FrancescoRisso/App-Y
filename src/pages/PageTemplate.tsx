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
	IonSpinner,
	IonTitle,
	IonToolbar
} from "@ionic/react";
import { arrowBackOutline, logOutOutline } from "ionicons/icons";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { AppContext } from "../components/AppContext";
import { appColors } from "../types";

export interface PageTemplateProps {
	pageContent: JSX.Element;
	header?: string | JSX.Element;
	footer?: JSX.Element;
	prevPage?: string;
	withLogout?: boolean;
	loading?: boolean;
	backgroundColor: appColors;
	headerColor: appColors;
}

const PageTemplate = ({
	pageContent,
	header,
	footer,
	prevPage,
	withLogout,
	loading,
	backgroundColor,
	headerColor
}: PageTemplateProps) => {
	const [redirect, setRedirect] = useState<boolean>(false);

	const prevPageRef = useRef<HTMLAnchorElement>(null);

	const context = useContext(AppContext);

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

	if (redirect) return <Redirect to="/" />;

	return (
		<IonPage>
			{header && (
				<IonHeader>
					<IonToolbar color={headerColor}>
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
						{withLogout && (
							<IonButtons slot="end">
								<IonButton
									onClick={async () => {
										await context.storage.clearAll();
										context.clearUserData();
										setRedirect(true);
									}}
								>
									<IonIcon slot="start" icon={logOutOutline} />
								</IonButton>
							</IonButtons>
						)}
					</IonToolbar>
				</IonHeader>
			)}
			<IonContent color={backgroundColor}>
				{loading ? (
					<div className="center-vertically ion-text-center">
						<IonSpinner />
					</div>
				) : (
					pageContent
				)}
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
