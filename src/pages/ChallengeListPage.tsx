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

import dopamine from "../images/tmp/dopamine.png";
import oxytocin from "../images/tmp/oxytocin.png";
import endorphin from "../images/tmp/endorphin.png";
import serotonin from "../images/tmp/serotonin.png";
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
			<h1 className="ion-text-center">Di che ormone hai bisogno?</h1>

			<div className="h-5-percent" />

			<ChallengeFlask
				imagePath={dopamine}
				link="/challenge/dopamine"
				ormonName="Dopamina"
				symptoms={[
					`di perdere tempo`,
					`poco motivat${term}`,
					`stanc${term} e con poche energie`,
					`ansios${term}`,
					`poco fiducios${term}`,
					`poco concentrat${term} o distratt${term}`,
					`con bassa autostima`,
					`con sbalzi di umore`
				]}
			/>

			<div className="h-5-percent" />

			<ChallengeFlask
				imagePath={oxytocin}
				link="/challenge/oxytocin"
				ormonName="Ossitocina"
				symptoms={[
					`sol${term}`,
					`stressat${term}`,
					`con poca motivazione`,
					`stanc${term} e con poche energie`,
					`disconness${term} dalle relazioni`,
					`ansios${term}`,
					`poco riposat${term}`
				]}
			/>

			<div className="h-5-percent" />

			<ChallengeFlask
				imagePath={serotonin}
				link="/challenge/serotonin"
				ormonName="Seratonina"
				symptoms={[
					`con bassa autostima`,
					`eccessivamente sensibile`,
					`ansios${term} e con attacchi di panico`,
					`con sbalzi di umore`,
					`senza fiducia`
				]}
			/>

			<div className="h-5-percent" />

			<ChallengeFlask
				imagePath={endorphin}
				link="/challenge/endorphin"
				ormonName="Endorfina"
				symptoms={[
					`ansios${term}`,
					`depress${term}`,
					`con sbalzi di umore`,
					`dolorante`,
					`poco riposat${term}`,
					`impulsiv${term}`
				]}
			/>
		</>
	);
};

export default ChallengeListPage;
