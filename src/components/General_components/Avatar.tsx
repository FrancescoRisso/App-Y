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

import defaultAvatar from "../../images/avatar/default.svg";
import TBD from "../../images/avatar/tbd.svg";
import { useRef } from "react";
import { Link } from "react-router-dom";

export interface AvatarProps {
	isDefault: boolean;
	link?: string;
	editAvatarText?: boolean;
}

const Avatar = ({ isDefault, link, editAvatarText }: AvatarProps) => {
	const linkRef = useRef<HTMLAnchorElement>(null);

	return (
		<div>
			{link && <Link to={link} ref={linkRef} />}
			<img
				src={defaultAvatar}
				className={`white-bg circular-avatar center-horizontally ${!isDefault && "ion-hide"}`}
				alt=""
				onClick={() => {
					if (link && linkRef.current) linkRef.current.click();
				}}
			/>
			{!isDefault && <img src={TBD} className={`white-bg circular-avatar center-horizontally`} alt="" />}
			{editAvatarText && <p className="no-margin-vertical ion-text-center">Modifica l'avatar</p>}
		</div>
	);
};

export default Avatar;
