import { tipsCategories } from "../../types";

import sport from "./sport";

const tipsSvgs = (cat: tipsCategories) => {
	switch (cat) {
		case "sport":
			return sport;
		default:
			return [];
	}
};

export default tipsSvgs;
