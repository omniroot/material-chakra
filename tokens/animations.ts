import { defineTokens } from "@chakra-ui/react";

export const animations = defineTokens.animations({
	linear: {
		value: "linear 0.4s cubic-bezier(0, 0, 1, 1)",
	},
	standardAccelerate: {
		value: "standard-accelerate 0.4s cubic-bezier(0.3, 0, 1, 1)",
	},
	standardDecelerate: {
		value: "standard-decelerate 0.4s cubic-bezier(0, 0, 0, 1)",
	},
	emphasizedAccelerate: {
		value: "emphasized-accelerate 0.4s cubic-bezier(0.3, 0, 0.8, 0.15)",
	},
	emphasizedDecelerate: {
		value: "emphasized-decelerate 0.4s cubic-bezier(0.05, 0.7, 0.1, 1)",
	},
	legacyAccelerate: {
		value: "legacy-accelerate 0.4s cubic-bezier(0.4, 0, 1, 1)",
	},
	legacyDecelerate: {
		value: "legacy-decelerate 0.4s cubic-bezier(0, 0, 0.2, 1)",
	},
	legacyStandard: {
		value: "legacy-standard 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
	},
	legacyEmphasized: {
		value: "legacy-emphasized 0.4s cubic-bezier(0.2, 0, 0, 1)",
	},
	// Аппроксимация для expressive spring с bounce (overshoot) через bezier
	expressiveBounce: {
		value: "expressive-bounce 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) ", // easeOutBack для overshoot/bounce
	},
	expressiveBounceInOut: {
		value: "expressive-bounce-inout 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) ", // easeInOutBack
	},
	spin: {
		value: "spin 1s linear infinite",
	},
	ping: {
		value: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
	},
	pulse: {
		value: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
	},
	bounce: {
		value: "bounce 1s infinite",
	},
});
