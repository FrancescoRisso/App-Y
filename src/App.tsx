import { Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

/* Components */
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

/* My css */
import "./App.css";
import "./cssUtils/heightPercentageClasses.css";

import PandaDisplayer from "./pages/PandaDisplayer";
import HomePage from "./pages/HomePage";
import AppContextProvider from "./components/AppContext";
import PersonalInfoPage from "./pages/PersonalInfoPage";
import PageTemplate from "./pages/PageTemplate";
import GenericRouteRedirector from "./pages/GenericRouteRedirector";
import TipsPage from "./pages/TipsPage";

setupIonicReact();

const App: React.FC = () => {
	return (
		<IonApp>
			<AppContextProvider
				child={
					<IonReactRouter>
						<IonRouterOutlet>
							<Route exact path="/register">
								<RegisterPage />
							</Route>

							<Route exact path="/login">
								<PageTemplate header="App-Y" pageContent={<LoginPage />} />
							</Route>

							<Route exact path="/pandas">
								<PageTemplate header="Panda!" pageContent={<PandaDisplayer />} prevPage="/home" />
							</Route>

							<Route exact path="/home">
								<PageTemplate header="App-Y" pageContent={<HomePage />} />
							</Route>

							<Route exact path="/personalInfoPage">
								<PageTemplate
									header="Il tuo profilo"
									withLogout
									pageContent={<PersonalInfoPage />}
									prevPage="/home"
								/>
							</Route>

							<Route exact path="/tips">
								<PageTemplate header="Tips" pageContent={<TipsPage />} prevPage="/home" />
							</Route>

							<Route>
								<GenericRouteRedirector />
							</Route>
						</IonRouterOutlet>
					</IonReactRouter>
				}
			/>
		</IonApp>
	);
};

export default App;
