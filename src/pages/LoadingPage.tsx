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

import PageTemplate from "./PageTemplate";

export interface LoadingPageProps {
	prevPage: string;
}

const LoadingPage = ({ prevPage }: LoadingPageProps) => {
	return (
		<PageTemplate
			prevPage={prevPage}
			header={{
				text: "Sto caricando...",
				type: "tongue",
				color: "violet",
				width: "100%",
				height: "24vh"
			}}
			pageContent={<></>}
			loading
			backgroundColor="white"
		/>
	);
};

export default LoadingPage;
