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

## Add in index.html

```html
<script>
  const cache = JSON.parse(localStorage.getItem("md-theme-cache"));

  Object.entries(cache.cssVars).map(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
</script>
<style>
  html,
  body {
    color: var(--md-on-surface);
    background-color: var(--md-surface);
  }
</style>
```
