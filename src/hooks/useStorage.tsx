import { Storage } from "@ionic/storage";
import { useEffect, useState } from "react";
import { StorageConnection } from "../types";

const useStorage = (): StorageConnection => {
	const [storage, setStorage] = useState<Storage | null>(null);
	const [isOk, setIsOk] = useState<boolean>(false);

	const initStorage = async () => {
		const newStore = new Storage({ name: "appy-storage" });
		const store = await newStore.create();
		setStorage(store);
		setIsOk(true);
	};

	const storeValue = async (key: string, val: any) => {
		await storage?.set(key, val);
	};

	const getValue = async (key: string) => {
		return await storage?.get(key);
	};

	const clearAll = async () => {
		await storage?.clear();
	};

	useEffect(() => {
		initStorage();
	}, []);

	return { storeValue, getValue, clearAll, isOk };
};

export default useStorage;
