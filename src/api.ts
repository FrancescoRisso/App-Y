import { AllApiTypes, CommonApiReturns, ServerServices, getAvatarReturn, getInfoReturn } from "../backendTypes";

const fetchUrl = async <type>(
	url: string,
	method: "POST" | "GET",
	expectedType: AllApiTypes,
	body?: Object | null
): Promise<type | null> => {
	const response = await fetch(url, {
		method,
		...(body && { body: JSON.stringify(body) }),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		}
	});
	const data = await response.json();

	if (response.ok) {
		if (data.type === expectedType) return data;
		if (data.type === "server_error" || data.type === "param_error") console.error(data.cause);
		return null;
	} else {
		throw data;
	}
};

const API: ServerServices = {
	getInfo: async ({ userID, pwd }) => {
		return fetchUrl<getInfoReturn | CommonApiReturns>("/api/getInfo", "POST", "userInfo", { userID, pwd });
	},
	getAvatar: async ({ userID }) => {
		return fetchUrl<getAvatarReturn | CommonApiReturns>(`/api/getAvatar?userID=${userID}`, "GET", "avatar");
	}
};

export default API;
