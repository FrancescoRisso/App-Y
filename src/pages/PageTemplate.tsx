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

import { IonContent, IonFooter, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";

export interface PageTemplateProps {
	pageContent: JSX.Element;
	header: string | JSX.Element;
	footer?: JSX.Element;
}

const PageTemplate = ({ pageContent, header, footer }: PageTemplateProps) => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>{typeof header === "string" ? <IonTitle>{header}</IonTitle> : header}</IonToolbar>
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
