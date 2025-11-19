import {
	argbFromHex,
	Hct,
	hexFromArgb,
	TonalPalette,
} from "@material/material-color-utilities";

/**
 * Генерирует и применяет Material You (MD3) палитру на основе одного цвета
 * Переменные будут в формате --md-primary, --md-surface-container-lowest и т.д.
 * Идеально для использования в Chakra UI через extendTheme + cssVarsRoot
 */
export function applyMaterialTheme(
	sourceHex: string,
	options: { mode?: "light" | "dark"; element?: HTMLElement } = {},
) {
	const { mode = "dark", element = document.documentElement } = options;

	// Валидация HEX
	const normalizedHex = sourceHex.trim();
	if (!/^#[\dA-Fa-f]{6}$|^#[\dA-Fa-f]{3}$/.test(normalizedHex)) {
		console.warn(`[MaterialYou] Неверный HEX: ${normalizedHex}. Используется #ee715a`);
		sourceHex = "#ee715a";
	}

	const sourceArgb = argbFromHex(normalizedHex);
	const sourceHct = Hct.fromInt(sourceArgb);

	// Основные палитры
	const primary = TonalPalette.fromHueAndChroma(sourceHct.hue, 36);
	const secondary = TonalPalette.fromHueAndChroma(sourceHct.hue, 16);
	const tertiary = TonalPalette.fromHueAndChroma(sourceHct.hue + 60, 24);
	const error = TonalPalette.fromHueAndChroma(25, 84);
	const neutral = TonalPalette.fromHueAndChroma(sourceHct.hue, 6);
	const neutralVariant = TonalPalette.fromHueAndChroma(sourceHct.hue, 8);

	// Тоны для светлой и тёмной темы (по официальной спецификации MD3 Baseline)
	const tones = {
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

			// Fixed tones (MD3 Baseline)
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

			// Surface containers (новая иерархия из Material Design 3 2024+)
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
	};

	const t = tones[mode];

	const vars = {
		// Source
		"--md-source-color": normalizedHex,

		// Primary
		"--md-primary": hexFromArgb(primary.tone(t.primary)),
		"--md-on-primary": hexFromArgb(primary.tone(t.onPrimary)),
		"--md-primary-container": hexFromArgb(primary.tone(t.primaryContainer)),
		"--md-on-primary-container": hexFromArgb(primary.tone(t.onPrimaryContainer)),
		"--md-primary-fixed": hexFromArgb(primary.tone(t.primaryFixed)),
		"--md-primary-fixed-dim": hexFromArgb(primary.tone(t.primaryFixedDim)),
		"--md-on-primary-fixed": hexFromArgb(primary.tone(t.onPrimaryFixed)),
		"--md-on-primary-fixed-variant": hexFromArgb(primary.tone(t.onPrimaryFixedVariant)),

		// Secondary
		"--md-secondary": hexFromArgb(secondary.tone(t.secondary)),
		"--md-on-secondary": hexFromArgb(secondary.tone(t.onSecondary)),
		"--md-secondary-container": hexFromArgb(secondary.tone(t.secondaryContainer)),
		"--md-on-secondary-container": hexFromArgb(secondary.tone(t.onSecondaryContainer)),
		"--md-secondary-fixed": hexFromArgb(secondary.tone(t.secondaryFixed)),
		"--md-secondary-fixed-dim": hexFromArgb(secondary.tone(t.secondaryFixedDim)),
		"--md-on-secondary-fixed": hexFromArgb(secondary.tone(t.onSecondaryFixed)),
		"--md-on-secondary-fixed-variant": hexFromArgb(
			secondary.tone(t.onSecondaryFixedVariant),
		),

		// Tertiary
		"--md-tertiary": hexFromArgb(tertiary.tone(t.tertiary)),
		"--md-on-tertiary": hexFromArgb(tertiary.tone(t.onTertiary)),
		"--md-tertiary-container": hexFromArgb(tertiary.tone(t.tertiaryContainer)),
		"--md-on-tertiary-container": hexFromArgb(tertiary.tone(t.onTertiaryContainer)),
		"--md-tertiary-fixed": hexFromArgb(tertiary.tone(t.tertiaryFixed)),
		"--md-tertiary-fixed-dim": hexFromArgb(tertiary.tone(t.tertiaryFixedDim)),
		"--md-on-tertiary-fixed": hexFromArgb(tertiary.tone(t.onTertiaryFixed)),
		"--md-on-tertiary-fixed-variant": hexFromArgb(
			tertiary.tone(t.onTertiaryFixedVariant),
		),

		// Error
		"--md-error": hexFromArgb(error.tone(t.error)),
		"--md-on-error": hexFromArgb(error.tone(t.onError)),
		"--md-error-container": hexFromArgb(error.tone(t.errorContainer)),
		"--md-on-error-container": hexFromArgb(error.tone(t.onErrorContainer)),

		// Surfaces & Background
		"--md-background": hexFromArgb(neutral.tone(t.background)),
		"--md-on-background": hexFromArgb(neutral.tone(t.onBackground)),
		"--md-surface": hexFromArgb(neutral.tone(t.surface)),
		"--md-on-surface": hexFromArgb(neutral.tone(t.onSurface)),
		"--md-surface-variant": hexFromArgb(neutralVariant.tone(t.surfaceVariant)),
		"--md-on-surface-variant": hexFromArgb(neutralVariant.tone(t.onSurfaceVariant)),

		// Surface hierarchy (самое важное для Elevation в MD3 2024)
		"--md-surface-dim": hexFromArgb(neutral.tone(t.surfaceDim)),
		"--md-surface-bright": hexFromArgb(neutral.tone(t.surfaceBright)),
		"--md-surface-container-lowest": hexFromArgb(neutral.tone(t.surfaceContainerLowest)),
		"--md-surface-container-low": hexFromArgb(neutral.tone(t.surfaceContainerLow)),
		"--md-surface-container": hexFromArgb(neutral.tone(t.surfaceContainer)),
		"--md-surface-container-high": hexFromArgb(neutral.tone(t.surfaceContainerHigh)),
		"--md-surface-container-highest": hexFromArgb(
			neutral.tone(t.surfaceContainerHighest),
		),

		// Outline & others
		"--md-outline": hexFromArgb(neutralVariant.tone(t.outline)),
		"--md-outline-variant": hexFromArgb(neutralVariant.tone(t.outlineVariant)),
		"--md-inverse-surface": hexFromArgb(neutral.tone(t.inverseSurface)),
		"--md-inverse-on-surface": hexFromArgb(neutral.tone(t.inverseOnSurface)),
		"--md-inverse-primary": hexFromArgb(primary.tone(t.inversePrimary)),
		"--md-surface-tint": hexFromArgb(primary.tone(mode === "light" ? 80 : 80)),
		"--md-shadow": "#000000",
		"--md-scrim": "#000000",
	};

	// Применяем всё одним махом
	Object.entries(vars).forEach(([name, value]) => {
		element.style.setProperty(name, value);
	});

	// Добавляем атрибут для удобства (полезно в Chakra UI)
	element.setAttribute("data-md-theme", mode);
	element.setAttribute("data-md-source", normalizedHex);

	console.log(`Material You тема применена: ${normalizedHex} → ${mode}`);
}
