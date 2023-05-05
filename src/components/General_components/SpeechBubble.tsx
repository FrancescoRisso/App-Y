/*

description:
	Creates a speech bubble
	
state:
	
hooks:
	
context:
		
*/

import { IonCard, IonCardContent } from "@ionic/react";

import { useRef, useEffect, useState, useCallback } from "react";

export interface SpeechBubbleProps {
	content: string | JSX.Element;
}

const SpeechBubble = ({ content }: SpeechBubbleProps) => {
	const card = useRef<HTMLIonCardElement>(null);

	const [pos, setPos] = useState<DOMRect>();

	const placeTalkingLabel = useCallback(() => {
		if (card.current && JSON.stringify(card.current.getBoundingClientRect()) !== JSON.stringify(pos))
			setPos(card.current.getBoundingClientRect());
	}, [card, pos]);

	useEffect(placeTalkingLabel, [placeTalkingLabel]);

	return (
		<>
			<div
				className="round-speechbubble-wrapper"
				style={{
					height: pos ? pos.height + 20 : "100%"
				}}
			>
				<IonCard ref={card} className="round-speechbubble">
					<IonCardContent>{content}</IonCardContent>
				</IonCard>
			</div>
		</>
	);
};

export default SpeechBubble;
