import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UseMaterial {
	color: string;
	setColor: (newColor: string) => void;
}

export const useMaterial = create<UseMaterial>()(
	persist(
		(set) => ({
			color: "#ff0000",
			setColor: (newColor) => set({ color: newColor }),
		}),
		{
			name: "material-theme", // имя хранения
			storage: createJSONStorage(() => localStorage), // использование localStorage
		},
	),
);
