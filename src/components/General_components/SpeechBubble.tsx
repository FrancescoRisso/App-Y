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
	const img = useRef<HTMLImageElement>(null);

	const [pos, setPos] = useState<DOMRect>();

	useEffect(() => {
		// This one sets the position first
		setTimeout(() => {
			if (card.current && card.current.getBoundingClientRect() !== pos)
				setPos(card.current.getBoundingClientRect());
		}, 10);

		// This should reposition it fast enought so that the user does not notice
		setTimeout(() => {
			if (card.current && card.current.getBoundingClientRect() !== pos)
				setPos(card.current.getBoundingClientRect());
		}, 30);

		// In extreme cases, this repositions after a while
		setTimeout(() => {
			if (card.current && card.current.getBoundingClientRect() !== pos)
				setPos(card.current.getBoundingClientRect());
		}, 60);
	}, [card, pos]);

	return (
		<>
			<IonCard ref={card}>
				<IonCardContent>{content}</IonCardContent>
			</IonCard>
			{pos && (
				<img
					src={talkingLabel}
					alt=""
					width="10%"
					ref={img}
					style={{
						zIndex: 1,
						position: "fixed",
						top: pos.y + pos.height - 1,
						left: pos.x + 0.1 * pos.width
					}}
				/>
			)}
		</>
	);
};

export default SpeechBubble;
