# Material Chakra

MAterial 3 theme for chakra ui.

## Installation

```bash
  git submodule add https://github.com/omniroot/material-chakra ./src/theme
  git init
```

## Update

```bash
  git submodule update --remote
```

## Tanstack Start (\_\_root.tsx)

```tsx
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { MaterialProvider } from "@/theme/components/MaterialProvider.tsx";
import MaterialThemeInject from "@/theme/components/MaterialThemeInject.tsx?url";
import MaterialThemeStyles from "@/theme/components/MaterialStyles.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "TanStack Start Starter",
			},
		],
		scripts: [
			{
				type: "module",
				src: MaterialThemeInject,
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: MaterialThemeStyles,
			},
		],
	}),

	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<QueryClientProvider client={client}>
					<MaterialProvider>{children}</MaterialProvider>
				</QueryClientProvider>
				<Scripts />
			</body>
		</html>
	);
}
```

## VITE

```html
<script type="module" src="/src/theme/components/MaterialThemeInject.tsx"></script>
<link rel="stylesheet" href="/src/theme/components/MaterialStyles.css" />
```
