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
import "./cssUtils/bootstrapMarginPadding.css";
import "./fonts/fonts.css";

import PandaDisplayer from "./pages/PandaDisplayer";
import HomePage from "./pages/HomePage";
import AppContextProvider from "./components/AppContext";
import PersonalInfoPage from "./pages/PersonalInfoPage";
import PageTemplate from "./pages/PageTemplate";
import GenericRouteRedirector from "./pages/GenericRouteRedirector";
import TipsPage from "./pages/TipsPage";
import ChallengeListPage from "./pages/ChallengeListPage";
import DiaryPageManagement from "./pages/DiaryPageManagement";
import { isTipCategory } from "./types";
import TipsCategoryPage from "./pages/TipsCategoryPage";

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
								<PageTemplate
									backgroundColor="white"
									headerColor="violet"
									pageContent={<LoginPage />}
								/>
							</Route>

							<Route exact path="/pandas">
								<PageTemplate
									backgroundColor="white"
									headerColor="violet"
									header="Panda!"
									pageContent={<PandaDisplayer />}
									prevPage="/home"
								/>
							</Route>

							<Route exact path="/home">
								<PageTemplate
									backgroundColor="white"
									headerColor="violet"
									header="App-Y"
									pageContent={<HomePage />}
								/>
							</Route>

							<Route exact path="/personalInfoPage">
								<PageTemplate
									backgroundColor="white"
									headerColor="violet"
									header="Il tuo profilo"
									withLogout
									pageContent={<PersonalInfoPage />}
									prevPage="/home"
								/>
							</Route>

							<Route exact path="/tips">
								<PageTemplate
									backgroundColor="white"
									headerColor="violet"
									header="Tips"
									pageContent={<TipsPage />}
									prevPage="/home"
								/>
							</Route>

							<Route
								exact
								path="/tipsCategory/:category"
								render={({ match }) => (
									<PageTemplate
										backgroundColor="white"
										headerColor="violet"
										pageContent={
											<TipsCategoryPage
												category={
													isTipCategory(match.params.category)
														? match.params.category
														: "sport"
												}
											/>
										}
										prevPage="/home"
									/>
								)}
							/>

							<Route exact path="/challenge">
								<PageTemplate
									backgroundColor="white"
									headerColor="violet"
									header="Challenge"
									pageContent={<ChallengeListPage />}
									prevPage="/home"
								/>
							</Route>

							<Route exact path="/diary">
								<DiaryPageManagement />
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
