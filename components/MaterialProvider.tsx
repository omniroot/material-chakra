import { ChakraProvider } from "@chakra-ui/react";
import { FC, ReactNode, useEffect, useState } from "react";
import { useMaterial } from "@/theme/components/MaterialStore.tsx";
import { materialChakraTheme } from "@/theme/index.ts";
import "./MaterialStyles.css";
import { applyMaterialTheme } from "@/theme/components/MaterialUtils.tsx";

interface MaterialProvider {
	children?: ReactNode;
}

export const MaterialProvider: FC<MaterialProvider> = ({ children }) => {
	const [_, setIsApplied] = useState(false);
	const { color } = useMaterial();

	useEffect(() => {
		applyMaterialTheme(color);
		setIsApplied(true);
	}, [color]);

	useEffect(() => {}, []);

	// primary: {
	// 	value: "var(--md-primary)",
	// },

	// if (!isApplied) return null;
	return <ChakraProvider value={materialChakraTheme}>{children}</ChakraProvider>;
};
