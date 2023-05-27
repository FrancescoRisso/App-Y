import {
	alarmOutline,
	bookOutline,
	bulbOutline,
	cafeOutline,
	colorPaletteOutline,
	filmOutline,
	fitnessOutline,
	footballOutline,
	gameControllerOutline,
	heartOutline,
	laptopOutline,
	leafOutline,
	mapOutline,
	musicalNotesOutline,
	peopleOutline,
	personOutline
} from "ionicons/icons";
import meditating from "./images/diary/meditation.svg";
import pet from "./images/diary/pet.svg";
import { diaryActivities, graphFields } from './types';

export const activityIcons: Record<diaryActivities, string> = {
	alone: personOutline,
	cinema: filmOutline,
	creativity: bulbOutline,
	draw: colorPaletteOutline,
	explore: mapOutline,
	friends: peopleOutline,
	love: heartOutline,
	meditation: meditating,
	music: musicalNotesOutline,
	nature: leafOutline,
	pet: pet,
	play: gameControllerOutline,
	relax: cafeOutline,
	selfcare: fitnessOutline,
	sport: footballOutline,
	study: bookOutline,
	timeManag: alarmOutline,
	work: laptopOutline
};

export const activityNames: Record<diaryActivities, string> = {
	alone: "Solitudine",
	cinema: "Cinema",
	creativity: "Creatività",
	draw: "Disegno",
	explore: "Esplorazione",
	friends: "Amici",
	love: "Amore",
	meditation: "Meditazione",
	music: "Musica",
	nature: "Natura",
	pet: "Animali",
	play: "Gioco",
	relax: "Relax",
	selfcare: "Cura di sè",
	sport: "Sport",
	study: "Studio",
	timeManag: "Gestione del tempo",
	work: "Lavoro"
};

export const graphFieldsNames: Record<graphFields, string> = {
	career: "Carriera",
	health: "Salute",
	organization: "Organizzazione",
	passion: "Passioni",
	relationships: "Relazioni",
	selfcare: "Self care"
}
