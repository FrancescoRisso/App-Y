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

import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router";
import PageTemplate from "./PageTemplate";
import { IonSpinner } from "@ionic/react";
import { AppContext } from "../components/AppContext";

export interface GenericRouteRedirectorProps {}

const GenericRouteRedirector = () => {
	const [redirectTo, setRedirectTo] = useState<string | null>(null);

	const context = useContext(AppContext);

	useEffect(() => {
		const f = async () => {
			if (context.storage.isOk) {
				if ((await context.storage.getValue("userID")) === null) setRedirectTo("/login");
				else setRedirectTo("/home");
			}
		};
		f();
	}, [context.storage]);

	if (redirectTo) return <Redirect to={redirectTo} />;

	return (
		<PageTemplate
			header="Sto caricando..."
			pageContent={
				<div className="center-vertically ion-text-center">
					<IonSpinner />
				</div>
			}
		/>
	);
};

export default GenericRouteRedirector;
