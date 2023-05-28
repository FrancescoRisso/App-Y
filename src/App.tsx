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
import "./cssUtils/widthPercentageClasses.css";
import "./cssUtils/bootstrapMarginPadding.css";
import "./fonts/fonts.css";

import PandaDisplayer from "./pages/PandaDisplayer";
import HomePage from "./pages/HomePage";
import AppContextProvider from "./components/AppContext";
import PageTemplate from "./pages/PageTemplate";
import GenericRouteRedirector from "./pages/GenericRouteRedirector";
import TipsPage from "./pages/TipsPage";
import DiaryPageManagement from "./pages/DiaryPageManagement";
import { isTipCategory, tipCategoryName, tipsCategories } from "./types";
import TipsCategoryPage from "./pages/TipsCategoryPage";
import TrendPage from "./pages/TrendPage";

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
									header={{
										color: "violet",
										text: "APP - Y",
										panda: "waving",
										height: "40vh",
										type: "tongue"
									}}
									pageContent={<LoginPage />}
								/>
							</Route>

							<Route exact path="/pandas">
								<PageTemplate
									backgroundColor="white"
									header={{ text: "Panda!", color: "violet", type: "tongue", height: "24vh" }}
									pageContent={<PandaDisplayer />}
									prevPage="/home"
								/>
							</Route>

							<Route exact path="/home">
								<PageTemplate
									backgroundColor="white"
									header={{
										text: "App-Y",
										color: "violet",
										height: "40vw",
										type: "cloud-right",
										width: "100vw"
									}}
									pageContent={<HomePage />}
								/>
							</Route>

							{/* <Route exact path="/personalInfoPage">
								<PageTemplate
									backgroundColor="white"
									// header="Il tuo profilo"
									// withLogout
									pageContent={<PersonalInfoPage />}
									prevPage="/home"
								/>
							</Route> */}

							<Route exact path="/tips">
								<PageTemplate
									backgroundColor="violet"
									header={{ text: "Tips", color: "violet", type: "rectangle", height: "12vh" }}
									pageContent={<TipsPage />}
									prevPage="/home"
								/>
							</Route>

							<Route exact path="/trend">
								<PageTemplate
									backgroundColor="white"
									header={{
										text: "Trend",
										color: "violet",
										type: "cloud-left",
										height: "55vw",
										width: "100vw"
									}}
									pageContent={<TrendPage />}
									prevPage="/home"
								/>
							</Route>

							<Route
								exact
								path="/tipsCategory/:category"
								render={({ match }) => {
									const category: tipsCategories = isTipCategory(match.params.category)
										? match.params.category
										: "sport";

									return (
										<PageTemplate
											backgroundColor="white"
											header={{
												color: "violet",
												type: "cloud-center",
												text: tipCategoryName(category),
												height: "83vw",
												width: "100%"
											}}
											pageContent={
												<TipsCategoryPage
													category={
														isTipCategory(match.params.category)
															? match.params.category
															: "sport"
													}
												/>
											}
											prevPage="/tips"
										/>
									);
								}}
							/>

							{/* <Route exact path="/challenge">
								<PageTemplate
									backgroundColor="white"
									// headerColor="violet"
									// header="Challenge"
									pageContent={<ChallengeListPage />}
									prevPage="/home"
								/>
							</Route> */}

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
