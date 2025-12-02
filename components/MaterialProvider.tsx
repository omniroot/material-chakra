import { ChakraProvider } from "@chakra-ui/react";
import {
	createContext,
	type FC,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { applyMaterialTheme, MD_STORAGE_KEY } from "@/theme/components/MaterialUtils.tsx";
import { materialChakraTheme } from "@/theme/index.ts";
import "./MaterialStyles.css";

interface MaterialProvider {
	children?: ReactNode;
}

interface MaterialContext {
	color: string;
	mode: "light" | "dark";
	setColor: (newColor: MaterialContext["color"]) => void;
	setMode: (newMode: MaterialContext["mode"]) => void;
}

const MaterialContext = createContext<MaterialContext | undefined>(undefined);

export const MaterialProvider: FC<MaterialProvider> = ({ children }) => {
	const getCached = useCallback((): {
		color: string;
		mode: "light" | "dark";
	} => {
		try {
			const raw = localStorage.getItem(MD_STORAGE_KEY);
			if (raw) {
				const parsed = JSON.parse(raw);
				if (parsed.sourceHex && (parsed.mode === "light" || parsed.mode === "dark")) {
					return { color: parsed.sourceHex, mode: parsed.mode };
				}
			}
		} catch {}
		return { color: "#ee715a", mode: "dark" }; // дефолт
	}, []);

	const [color, setColorState] = useState<string>(getCached().color);
	const [mode, setModeState] = useState<"light" | "dark">(getCached().mode);

	// При любом изменении — просто вызываем applyMaterialTheme
	// Он сам всё закеширует внутри себя
	useEffect(() => {
		applyMaterialTheme({ sourceColor: color, mode });
		document.documentElement.setAttribute("data-theme", mode);
	}, [color, mode]);

	const setColor = (newColor: string) => {
		const normalized = newColor.trim().toLowerCase();
		if (/^#[\da-f]{3,6}$/.test(normalized) || /^#[\da-f]{8}$/.test(normalized)) {
			setColorState(normalized);
		}
	};

	const setMode = (newMode: "light" | "dark") => setModeState(newMode);

	// const reset = () => {
	// 	localStorage.removeItem(MD_STORAGE_KEY);
	// 	setColorState("#ee715a");
	// 	setModeState("dark");
	// };

	return (
		<MaterialContext.Provider value={{ color, mode, setColor, setMode }}>
			<ChakraProvider value={materialChakraTheme}>{children}</ChakraProvider>
		</MaterialContext.Provider>
	);
};

export const useMaterial = (): MaterialContext => {
	const context = useContext(MaterialContext);
	if (!context) {
		throw new Error("useMaterial must be used within a MaterialProvider");
	}
	return context;
};
