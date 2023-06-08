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

import ChallengeFlask from "../components/General_components/ChallengeFlask";

import dopamine from "../images/challenge/filledFlaskYellow.svg";
import oxytocin from "../images/challenge/filledFlaskGreen.svg";
import endorphin from "../images/challenge/filledFlaskViolet.svg";
import serotonin from "../images/challenge/filledFlaskBlue.svg";
import { useContext, useEffect, useMemo } from "react";
import { AppContext } from "../components/AppContext";

export interface ChallengeListPageProps {}

const ChallengeListPage = () => {
	const context = useContext(AppContext);

	useEffect(() => {
		context.loaders.loadUserDetails();
	}, [context.loaders]);

	const term = useMemo<string>(() => context.getGenderTerminations(), [context]);

	return (
		<>
			<h1 className="ion-text-center mx-3">Scegli il tipo di challenge di cui hai più bisogno:</h1>

			<div className="h-5-percent" />

			<ChallengeFlask
				filled={context.storedValues.challengeCompleted.val}
				filledIcon={endorphin}
				ormon="endorphin"
				symptoms={[
					`ansios${term}`,
					// `depress${term}`,
					// `con sbalzi di umore`,
					// `dolorante`,
					`poco riposat${term}`,
					`impulsiv${term}`
				]}
			/>

			<div className="h-5-percent" />

			<ChallengeFlask
				filledIcon={dopamine}
				filled
				ormon="dopamine"
				symptoms={[
					// `di perdere tempo`,
					`poco motivat${term}`,
					// `stanc${term} e con poche energie`,
					// `ansios${term}`,
					`poco fiducios${term}`,
					// `poco concentrat${term} o distratt${term}`,
					// `con bassa autostima`,
					`con sbalzi di umore`
				]}
			/>

			<div className="h-5-percent" />

			<ChallengeFlask
				filled
				filledIcon={oxytocin}
				ormon="oxytocin"
				symptoms={[
					`sol${term}`,
					`stressat${term}`,
					// `con poca motivazione`,
					// `stanc${term} e con poche energie`,
					`disconness${term} dalle relazioni`
					// `ansios${term}`,
					// `poco riposat${term}`
				]}
			/>

			<div className="h-5-percent" />

			<ChallengeFlask
				filledIcon={serotonin}
				filled
				ormon="serotonin"
				symptoms={[
					`con bassa autostima`,
					`eccessivamente sensibile`,
					// `ansios${term} e con attacchi di panico`,
					// `con sbalzi di umore`,
					`senza fiducia`
				]}
			/>

			<div className="h-5-percent" />
		</>
	);
};

export default ChallengeListPage;
