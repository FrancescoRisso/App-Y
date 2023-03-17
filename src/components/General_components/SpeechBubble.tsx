/*

description:
	Creates a speech bubble
	
state:
	
hooks:
	
context:
		
*/

import { IonCard, IonCardContent } from "@ionic/react";

import talkingLabel from "../../images/tmp/talkingLabel.png";
import { useRef, useEffect, useState } from "react";

export interface SpeechBubbleProps {
	content: string | JSX.Element;
}

const SpeechBubble = ({ content }: SpeechBubbleProps) => {
	const card = useRef<HTMLIonCardElement>(null);

	const [pos, setPos] = useState<DOMRect>();

	useEffect(()=>{
		if(card.current) setPos(card.current.getBoundingClientRect())
	}, [card])

	return (
		<>
			<IonCard ref={card}>
				<IonCardContent>{content}</IonCardContent>
			</IonCard>
			{pos && <img
				src={talkingLabel}
				alt=""
				width="10%"
				style={{
					position: "fixed",
					top: pos.y + pos.height - 1,
					left: pos.x + 0.1 * pos.width
				}}
			/>}
		</>
	);
};

export default SpeechBubble;
