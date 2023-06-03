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
import { diaryActivities, goalType, graphFields } from "./types";
import moment from "moment";

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
};

export const getGraphFieldsZeroValues = () => {
	return {
		career: 0,
		health: 0,
		organization: 0,
		passion: 0,
		relationships: 0,
		selfcare: 0
	};
};

export const getDefaultGoals = (): goalType[] => [
	{
		title: "Andare in palestra 4 volte questa settimana",
		startTime: moment().subtract(3, "days"),
		endTime: moment().add(4, "days")
	},
	{
		title: "Studiare quattro volte per 1 ora",
		startTime: moment().subtract(1, "hour").subtract(3, "minutes"),
		endTime: moment().add(4, "hour").add(57, "minutes")
	},
	{
		title: "Leggere un nuovo libro",
		startTime: moment().subtract(30, "days"),
		endTime: moment().add(30, "days")
	},
	{
		title: "Passare l'esame",
		startTime: moment().subtract(4 * 30, "days"),
		endTime: moment().add(10, "days")
	}
];
