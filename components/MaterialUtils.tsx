import {
	argbFromHex,
	Hct,
	hexFromArgb,
	TonalPalette,
} from "@material/material-color-utilities";

export const MD_STORAGE_KEY = "md-theme-cache";
type ThemeMode = "light" | "dark";

export interface MaterialCache {
	sourceHex: string;
	mode: ThemeMode;
	cssVars: Record<string, string>;
	timestamp: number;
}

const TONES = {
	light: {
		primary: 40,
		onPrimary: 100,
		primaryContainer: 90,
		onPrimaryContainer: 10,
		secondary: 40,
		onSecondary: 100,
		secondaryContainer: 90,
		onSecondaryContainer: 10,
		tertiary: 40,
		onTertiary: 100,
		tertiaryContainer: 90,
		onTertiaryContainer: 10,
		error: 40,
		onError: 100,
		errorContainer: 90,
		onErrorContainer: 10,

		background: 99,
		onBackground: 10,
		surface: 99,
		onSurface: 10,
		surfaceVariant: 90,
		onSurfaceVariant: 30,
		outline: 50,
		outlineVariant: 80,
		inverseSurface: 20,
		inverseOnSurface: 95,
		inversePrimary: 80,

		// Fixed
		primaryFixed: 90,
		primaryFixedDim: 80,
		onPrimaryFixed: 10,
		onPrimaryFixedVariant: 30,
		secondaryFixed: 90,
		secondaryFixedDim: 80,
		onSecondaryFixed: 10,
		onSecondaryFixedVariant: 30,
		tertiaryFixed: 90,
		tertiaryFixedDim: 80,
		onTertiaryFixed: 10,
		onTertiaryFixedVariant: 30,

		// Surface containers (2024+)
		surfaceDim: 87,
		surfaceBright: 98,
		surfaceContainerLowest: 100,
		surfaceContainerLow: 96,
		surfaceContainer: 94,
		surfaceContainerHigh: 92,
		surfaceContainerHighest: 90,
	},
	dark: {
		primary: 80,
		onPrimary: 20,
		primaryContainer: 30,
		onPrimaryContainer: 90,
		secondary: 80,
		onSecondary: 20,
		secondaryContainer: 30,
		onSecondaryContainer: 90,
		tertiary: 80,
		onTertiary: 20,
		tertiaryContainer: 30,
		onTertiaryContainer: 90,
		error: 80,
		onError: 20,
		errorContainer: 30,
		onErrorContainer: 90,

		background: 6,
		onBackground: 90,
		surface: 6,
		onSurface: 90,
		surfaceVariant: 30,
		onSurfaceVariant: 80,
		outline: 60,
		outlineVariant: 30,
		inverseSurface: 90,
		inverseOnSurface: 20,
		inversePrimary: 40,

		primaryFixed: 90,
		primaryFixedDim: 80,
		onPrimaryFixed: 10,
		onPrimaryFixedVariant: 30,
		secondaryFixed: 90,
		secondaryFixedDim: 80,
		onSecondaryFixed: 10,
		onSecondaryFixedVariant: 30,
		tertiaryFixed: 90,
		tertiaryFixedDim: 80,
		onTertiaryFixed: 10,
		onTertiaryFixedVariant: 30,

		surfaceDim: 6,
		surfaceBright: 24,
		surfaceContainerLowest: 4,
		surfaceContainerLow: 10,
		surfaceContainer: 12,
		surfaceContainerHigh: 17,
		surfaceContainerHighest: 22,
	},
} as const;

function normalizeHex(hex: string): string {
	const cleaned = hex.trim().toLowerCase();
	if (/^#[\da-f]{3}$/.test(cleaned)) {
		return `#${cleaned[1]}${cleaned[1]}${cleaned[2]}${cleaned[2]}${cleaned[3]}${cleaned[3]}`;
	}
	if (/^#[\da-f]{6}$/.test(cleaned)) return cleaned;
	console.warn(`[MaterialYou] Неверный HEX: ${hex}. Используется #ee715a`);
	return "#ee715a";
}

function createPalettes(sourceHex: string) {
	const argb = argbFromHex(sourceHex);
	const hct = Hct.fromInt(argb);

	return {
		primary: TonalPalette.fromHueAndChroma(hct.hue, 36),
		secondary: TonalPalette.fromHueAndChroma(hct.hue, 16),
		tertiary: TonalPalette.fromHueAndChroma((hct.hue + 60) % 360, 24),
		error: TonalPalette.fromHueAndChroma(25, 84),
		neutral: TonalPalette.fromHueAndChroma(hct.hue, 6),
		neutralVariant: TonalPalette.fromHueAndChroma(hct.hue, 8),
	};
}

function generateCssVars(sourceHex: string, mode: ThemeMode) {
	const palettes = createPalettes(sourceHex);
	const t = TONES[mode];

	const vars: Record<string, string> = {
		"--md-source-color": sourceHex,

		// Primary
		"--md-primary": hexFromArgb(palettes.primary.tone(t.primary)),
		"--md-on-primary": hexFromArgb(palettes.primary.tone(t.onPrimary)),
		"--md-primary-container": hexFromArgb(palettes.primary.tone(t.primaryContainer)),
		"--md-on-primary-container": hexFromArgb(palettes.primary.tone(t.onPrimaryContainer)),
		"--md-primary-fixed": hexFromArgb(palettes.primary.tone(t.primaryFixed)),
		"--md-primary-fixed-dim": hexFromArgb(palettes.primary.tone(t.primaryFixedDim)),
		"--md-on-primary-fixed": hexFromArgb(palettes.primary.tone(t.onPrimaryFixed)),
		"--md-on-primary-fixed-variant": hexFromArgb(
			palettes.primary.tone(t.onPrimaryFixedVariant),
		),

		// Secondary
		"--md-secondary": hexFromArgb(palettes.secondary.tone(t.secondary)),
		"--md-on-secondary": hexFromArgb(palettes.secondary.tone(t.onSecondary)),
		"--md-secondary-container": hexFromArgb(
			palettes.secondary.tone(t.secondaryContainer),
		),
		"--md-on-secondary-container": hexFromArgb(
			palettes.secondary.tone(t.onSecondaryContainer),
		),
		"--md-secondary-fixed": hexFromArgb(palettes.secondary.tone(t.secondaryFixed)),
		"--md-secondary-fixed-dim": hexFromArgb(palettes.secondary.tone(t.secondaryFixedDim)),
		"--md-on-secondary-fixed": hexFromArgb(palettes.secondary.tone(t.onSecondaryFixed)),
		"--md-on-secondary-fixed-variant": hexFromArgb(
			palettes.secondary.tone(t.onSecondaryFixedVariant),
		),

		// Tertiary
		"--md-tertiary": hexFromArgb(palettes.tertiary.tone(t.tertiary)),
		"--md-on-tertiary": hexFromArgb(palettes.tertiary.tone(t.onTertiary)),
		"--md-tertiary-container": hexFromArgb(palettes.tertiary.tone(t.tertiaryContainer)),
		"--md-on-tertiary-container": hexFromArgb(
			palettes.tertiary.tone(t.onTertiaryContainer),
		),
		"--md-tertiary-fixed": hexFromArgb(palettes.tertiary.tone(t.tertiaryFixed)),
		"--md-tertiary-fixed-dim": hexFromArgb(palettes.tertiary.tone(t.tertiaryFixedDim)),
		"--md-on-tertiary-fixed": hexFromArgb(palettes.tertiary.tone(t.onTertiaryFixed)),
		"--md-on-tertiary-fixed-variant": hexFromArgb(
			palettes.tertiary.tone(t.onTertiaryFixedVariant),
		),

		// Error
		"--md-error": hexFromArgb(palettes.error.tone(t.error)),
		"--md-on-error": hexFromArgb(palettes.error.tone(t.onError)),
		"--md-error-container": hexFromArgb(palettes.error.tone(t.errorContainer)),
		"--md-on-error-container": hexFromArgb(palettes.error.tone(t.onErrorContainer)),

		// Surfaces
		"--md-background": hexFromArgb(palettes.neutral.tone(t.background)),
		"--md-on-background": hexFromArgb(palettes.neutral.tone(t.onBackground)),
		"--md-surface": hexFromArgb(palettes.neutral.tone(t.surface)),
		"--md-on-surface": hexFromArgb(palettes.neutral.tone(t.onSurface)),
		"--md-surface-variant": hexFromArgb(palettes.neutralVariant.tone(t.surfaceVariant)),
		"--md-on-surface-variant": hexFromArgb(
			palettes.neutralVariant.tone(t.onSurfaceVariant),
		),

		"--md-surface-dim": hexFromArgb(palettes.neutral.tone(t.surfaceDim)),
		"--md-surface-bright": hexFromArgb(palettes.neutral.tone(t.surfaceBright)),
		"--md-surface-container-lowest": hexFromArgb(
			palettes.neutral.tone(t.surfaceContainerLowest),
		),
		"--md-surface-container-low": hexFromArgb(
			palettes.neutral.tone(t.surfaceContainerLow),
		),
		"--md-surface-container": hexFromArgb(palettes.neutral.tone(t.surfaceContainer)),
		"--md-surface-container-high": hexFromArgb(
			palettes.neutral.tone(t.surfaceContainerHigh),
		),
		"--md-surface-container-highest": hexFromArgb(
			palettes.neutral.tone(t.surfaceContainerHighest),
		),

		"--md-outline": hexFromArgb(palettes.neutralVariant.tone(t.outline)),
		"--md-outline-variant": hexFromArgb(palettes.neutralVariant.tone(t.outlineVariant)),
		"--md-inverse-surface": hexFromArgb(palettes.neutral.tone(t.inverseSurface)),
		"--md-inverse-on-surface": hexFromArgb(palettes.neutral.tone(t.inverseOnSurface)),
		"--md-inverse-primary": hexFromArgb(palettes.primary.tone(t.inversePrimary)),

		"--md-surface-tint": hexFromArgb(palettes.primary.tone(80)),
		"--md-shadow": "#000000",
		"--md-scrim": "#000000",
	};

	return vars;
}

function applyVarsToElement(vars: Record<string, string>, element: HTMLElement) {
	Object.entries(vars).forEach(([key, value]) => {
		element.style.setProperty(key, value);
	});
}

function saveToCache(
	sourceHex: string,
	mode: ThemeMode,
	cssVars: Record<string, string>,
) {
	const cache: MaterialCache = {
		sourceHex,
		mode,
		cssVars,
		timestamp: Date.now(),
	};
	try {
		localStorage.setItem(MD_STORAGE_KEY, JSON.stringify(cache));
	} catch (e) {
		console.warn("[MaterialYou] Не удалось сохранить кеш в localStorage", e);
	}
}

function getFromCache(sourceHex: string, mode: ThemeMode): Record<string, string> | null {
	try {
		const raw = localStorage.getItem(MD_STORAGE_KEY);
		if (!raw) return null;

		const cached: MaterialCache = JSON.parse(raw);
		if (cached.sourceHex === sourceHex && cached.mode === mode) {
			return cached.cssVars;
		}
	} catch (e) {
		console.warn("[MaterialYou] Ошибка чтения кеша", e);
	}
	return null;
}

export function clearMaterialThemeCache() {
	localStorage.removeItem(MD_STORAGE_KEY);
	console.log("Кеш Material You очищен");
}

export function applyMaterialTheme(
	options: { sourceColor?: string; mode?: ThemeMode; element?: HTMLElement } = {},
) {
	const {
		sourceColor = "#ff0000",
		mode = "dark",
		element = document.documentElement,
	} = options;
	const normalizedHex = normalizeHex(sourceColor);

	// Попробуем взять из кеша
	const cachedVars = getFromCache(normalizedHex, mode);
	if (cachedVars) {
		applyVarsToElement(cachedVars, element);
		element.setAttribute("data-md-theme", mode);
		element.setAttribute("data-md-source", normalizedHex);
		console.log(`Material You тема из кеша: ${normalizedHex} → ${mode}`);
		return;
	}

	// Генерируем и применяем
	const cssVars = generateCssVars(normalizedHex, mode);
	applyVarsToElement(cssVars, element);

	element.setAttribute("data-md-theme", mode);
	element.setAttribute("data-md-source", normalizedHex);

	// Сохраняем в кеш
	saveToCache(normalizedHex, mode, cssVars);

	console.log(
		`Material You тема сгенерирована и закеширована: ${normalizedHex} → ${mode}`,
	);
}
