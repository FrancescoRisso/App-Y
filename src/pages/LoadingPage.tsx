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
			header="Sto caricando..."
			pageContent={<></>}
			loading
			headerColor="violet"
			backgroundColor="white"
		/>
	);
};

export default LoadingPage;
