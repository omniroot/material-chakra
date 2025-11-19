import { MaterialCache } from "@/theme/components/MaterialUtils.tsx";

function injectMaterialTheme() {
	const cache: MaterialCache = JSON.parse(localStorage.getItem("md-theme-cache") || "");
	if (cache && cache.cssVars) {
		Object.entries(cache.cssVars).forEach(([key, value]) => {
			document.documentElement.style.setProperty(key, value);
		});
	}
}

injectMaterialTheme();
