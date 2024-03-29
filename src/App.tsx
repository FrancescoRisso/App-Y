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
import { isOrmon, isTipCategory, ormons, tipCategoryName, tipsCategories } from "./types";
import TipsCategoryPage from "./pages/TipsCategoryPage";
import TrendPage from "./pages/TrendPage";
import SurveyPage from "./pages/SurveyPage";
import GoalsPage from "./pages/GoalsPage";
import ChallengeListPage from "./pages/ChallengeListPage";
import { getOrmonName } from "./util";
import ChallengeCategory from "./pages/ChallengeCategory";

setupIonicReact();

const App: React.FC = () => {
	return (
		<IonApp>
			<AppContextProvider
				child={
					<IonReactRouter>
						<IonRouterOutlet>
							<Route exact path="/register">
								<PageTemplate
									backgroundColor="white"
									header={{
										color: "white",
										text: "Registrati",
										height: "16vh",
										type: "rectangle",
										alignTextBottom: true
									}}
									prevPage="/login"
									pageContent={<RegisterPage />}
								/>
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

							<Route exact path="/challenge">
								<PageTemplate
									backgroundColor="violet"
									header={{
										color: "white-violet-text",
										height: "40vw",
										text: "Challenges",
										type: "tongue",
										leaveEmptyLines: { top: 1 }
									}}
									pageContent={<ChallengeListPage />}
									prevPage="/home"
								/>
							</Route>

							<Route
								exact
								path="/challenge/:ormon"
								render={({ match }) => {
									const ormon: ormons = isOrmon(match.params.ormon)
										? match.params.ormon
										: "endorphin";

									return (
										<PageTemplate
											backgroundColor="violet"
											header={{
												color: "white-violet-text",
												type: "tongue",
												text: getOrmonName(ormon),
												height: "40vw",
												width: "100%",
												leaveEmptyLines: { top: 1 }
											}}
											pageContent={<ChallengeCategory category={ormon} />}
											prevPage="/challenge"
										/>
									);
								}}
							/>

							<Route exact path="/survey">
								<PageTemplate
									backgroundColor="violet"
									header={{ color: "violet", height: "25vw", text: "", type: "rectangle" }}
									pageContent={<SurveyPage />}
									prevPage="/home"
								/>
							</Route>

							<Route exact path="/goals">
								<PageTemplate
									backgroundColor="white"
									header={{
										color: "violet",
										height: "90vw",
										text: "Goals",
										type: "cloud-left",
										width: "100vw",
										leaveEmptyLines: { bottom: 3 }
									}}
									pageContent={<GoalsPage />}
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
