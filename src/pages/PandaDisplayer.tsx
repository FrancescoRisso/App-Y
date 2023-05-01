/*

description:
	Displays all the panda icons
	
state:
	
hooks:
	
context:
	
*/

import PandaImg from "../components/General_components/PandaImg";

const PandaDisplayer = () => {
	return (
		<div className="h-50-percent">
			<PandaImg width="80%" type="bamboo" />
			<PandaImg width="80%" type="cantSee" />
			<PandaImg width="80%" type="computer" />
			<PandaImg width="80%" type="confused" />
			<PandaImg width="80%" type="relaxed" />
			<PandaImg width="80%" type="skateboard" />
			<PandaImg width="80%" type="smiley" />
			<PandaImg width="80%" type="surprised" />
			<PandaImg width="80%" type="waving" />
		</div>
	);
};

export default PandaDisplayer;
