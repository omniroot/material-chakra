import { defineRecipe } from "@chakra-ui/react";

export const buttonRecipe = defineRecipe({
	className: "chakra-button",
	base: {
		display: "inline-flex",
		appearance: "none",
		alignItems: "center",
		justifyContent: "center",
		userSelect: "none",
		position: "relative",
		borderRadius: "full",
		whiteSpace: "nowrap",
		verticalAlign: "middle",
		borderWidth: "1px",
		borderColor: "transparent",
		cursor: "button",
		flexShrink: "0",
		outline: "0",
		lineHeight: "1.2",
		isolation: "isolate",
		fontWeight: "medium",
		// transitionProperty: "common",
		// transitionDuration: "moderate",
		focusVisibleRing: "outside",
		transition: "border-radius 150ms, margin 150ms",
		// transition: "border-radius 100ms {animations.expressiveBounce}",
		// transitionProperty:
		// 	"background-color, border-color, color, box-shadow, border-radius",
		// transitionDuration: "{animations.emphasizedDecelerate}", // ← берём из tokens
		// transitionTimingFunction: "linear", // важно! сама анимация в keyframes
		// transitionBehavior: "{animations.emphasizedDecelerate}",

		_active: {
			borderRadius: "md", // 12px
			mx: "-4px",
			// animation: "expressiveBounce", // ← вот так!
		},
		_disabled: {
			layerStyle: "disabled",
		},
		_icon: {
			flexShrink: "0",
		},
	},
	variants: {
		shape: {
			round: {
				borderRadius: "full",
			},
			square: {
				borderRadius: "md",
			},
		},
		size: {
			xs: {
				h: "2rem", // 32px — соответствует M3 "small" button (compact mode)
				minW: "4rem", // минимальная ширина ~64px
				fontSize: "0.75rem", // label-small (12px, weight 500)
				lineHeight: "1.25rem", // 20px
				px: "1rem", // horizontal padding 16px
				gap: "0.5rem", // 8px между icon и label
				borderRadius: "full", // full pill shape для small (или "1rem" = 16px если предпочитаешь не full)
				borderWidth: "0.0625rem", // 1px для Outlined
				// _active: {
				// 	borderRadius: "sm",
				// },
			},
			sm: {
				h: "2.5rem", // 40px — стандартный размер в большинстве M3 реализаций
				minW: "5rem", // ~80px
				fontSize: "0.875rem", // label-medium (14px, weight 500, prominent)
				lineHeight: "1.25rem", // 20px
				px: "1.5rem", // 24px horizontal padding (без icon)
				gap: "0.5rem", // 8px
				borderRadius: "full", // pill shape (или "1.25rem" = 20px fixed)
				borderWidth: "0.0625rem",
			},
			md: {
				h: "3rem", // 48px — соответствует M3 default height с touch target 48dp
				minW: "5.625rem", // 90px
				fontSize: "0.9375rem", // ~15px (label-large в некоторых токенах)
				lineHeight: "1.5rem", // 24px
				px: "1.75rem", // ~28px (adjusted for icon variant)
				gap: "0.625rem", // 10px
				borderRadius: "full",
				borderWidth: "0.0625rem",
			},
			lg: {
				h: "3.5rem", // 56px — large FAB-like или expanded mode
				minW: "6.25rem", // 100px+
				fontSize: "1rem", // 16px label-large
				lineHeight: "1.75rem",
				px: "2rem", // 32px
				gap: "0.75rem", // 12px
				borderRadius: "full",
				borderWidth: "0.0625rem",
			},
		},
		variant: {
			elevated: {
				bg: "surface-container-low",
				color: "primary",
				shadow: "2xl",
			},
			filled: {
				bg: "primary",
				color: "on-primary",
			},

			tonal: {
				bg: "secondary-container",
				color: "on-secondary-container",
			},
			outline: {
				bg: "transparent",
				border: `1px solid {colors.outline-variant}`,
				color: "on-surface-variant",
			},
			text: {
				bg: "transparent",
				color: "primary",
			},
		},
	},
	defaultVariants: {
		size: "md",
		variant: "filled",
	},
});
