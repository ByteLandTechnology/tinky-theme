**tinky-theme**

---

# tinky-theme

**The flexible, type-safe theming engine for Tinky**

`tinky-theme` provides a robust architecture for building themeable React components. It decouples component logic from visual styling using a powerful slot-based system, enabling deeply customizable UIs without the maintenance headache.

Designed for scalability, it supports global overrides, dynamic prop-based styling, and automatic deep merging—all fully typed with TypeScript.

## Features

- 🧩 **Slot-Based Architecture**: Define independent styles for every part of a component (e.g., `root`, `label`, `icon`).
- 🎨 **Dynamic Styling**: Use functions to drive styles based on component props (e.g., `disabled`, `variant`).
- ⚡ **Global Overrides**: Instantly rebrand components application-wide via a simple context provider.
- 🔄 **Smart Deep Merging**: User overrides intelligently merge with default themes—change a color without resetting the padding.
- 📐 **TypeScript First**: First-class type definitions ensuring autocompletion and type safety for your custom themes.

## Installation

Install the package via your preferred package manager:

```bash
npm install tinky-theme
# or
yarn add tinky-theme
# or
pnpm add tinky-theme
```

> **Note**: This package requires `react` (>=16.8.0) and `tinky` as peer dependencies.

## Key Concepts

### 1. The Component Theme

A **Component Theme** acts as the blueprint for a component's appearance. It is divided into two main sections:

- **`styles`**: Not just a single style object, but a collection of styles targeting specific _slots_ (internal parts) of the component. Each slot can be a static object or a dynamic function.
- **`config`**: Non-visual settings (e.g., animation speeds, default icon sets) that consumers might want to override globally.

### 2. The Slot System

Instead of prop drilling dozens of style props (`labelStyle`, `containerStyle`), `tinky-theme` maps styles to semantic names.

Example component structure:

- **`root`**: The outer container.
- **`icon`**: The visual indicator.
- **`label`**: The text content.

Users can target these specific slots in their theme overrides.

## Usage Guide

### Step 1: Defining a Component's Default Theme

When you build a component, you define its "contract" by exporting a default theme. This sets the baseline look and feel.

```tsx
import type { ComponentTheme } from "tinky-theme";

// 1. Define your component props
interface BadgeProps {
  variant?: "solid" | "subtle";
  status?: "success" | "warning" | "error";
  children: React.ReactNode;
}

// 2. Create the default theme definition
const defaultBadgeTheme: ComponentTheme<BadgeProps> = {
  styles: {
    // Dynamic style function for the root container
    root: (props) => ({
      display: "inline-flex",
      padding: "4px 8px",
      borderRadius: "4px",
      // Change color based on status prop
      backgroundColor: props.status === "success" ? "green" : "red",
      opacity: props.variant === "subtle" ? 0.8 : 1,
    }),
    // Static style for the text label
    label: {
      fontSize: "0.875rem",
      fontWeight: 600,
      color: "white",
    },
  },
};
```

### Step 2: Consuming the Theme

Inside your component, use the `useComponentTheme` hook to resolve the final styles. This hook automatically merges the default theme with any global context overrides.

```tsx
import { useComponentTheme } from "tinky-theme";
import { Box, Text } from "tinky";

export function Badge(props: BadgeProps) {
  // 3. Resolve the theme
  const theme = useComponentTheme("Badge", defaultBadgeTheme, props);

  return (
    // 4. Apply styles to slots
    <Box {...theme.styles?.root}>
      <Text {...theme.styles?.label}>{props.children}</Text>
    </Box>
  );
}
```

### Step 3: Overriding Globally

Consumers of your library can override specific parts of the component without rewriting the CSS.

```tsx
import { ThemeProvider, type Theme } from "tinky-theme";

// Define an application-level theme
const appTheme: Theme = {
  components: {
    Badge: {
      styles: {
        root: {
          // Override just the border radius, keep everything else
          borderRadius: "999px",
          textTransform: "uppercase",
        },
      },
    },
  },
};

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <Badge status="success">Approved</Badge>
    </ThemeProvider>
  );
}
```

## API Documentation

### `useComponentTheme`

```ts
function useComponentTheme<P>(
  componentName: string,
  defaultTheme: ComponentTheme<P>,
  props: P,
): ComponentTheme<P>;
```

**Returns**: A resolved theme object where all functions are executed and merged.

- `componentName`: The unique key used in the global theme registry.
- `defaultTheme`: The fallback styles defined by the component author.
- `props`: The current props, passed to style functions to generate dynamic values.

### `ThemeProvider`

A wrapper component that injects the theme context.

```tsx
<ThemeProvider theme={myTheme}>
  <App />
</ThemeProvider>
```

| Prop       | Type             | Description                                          |
| ---------- | ---------------- | ---------------------------------------------------- |
| `theme`    | `Partial<Theme>` | The global theme object. Can be updated dynamically. |
| `children` | `ReactNode`      | The app or component tree.                           |

### `extendTheme`

A utility to deep-merge standard themes with user customizations.

```ts
const finalTheme = extendTheme(baseTheme, userOverrides);
```

## Advanced Usage

### TypeScript Integration

`tinky-theme` exports all necessary types (`Theme`, `ComponentTheme`, `StyleObject`) to ensure your theme definitions are type-checked.

### Conflict Resolution

When merging styles:

1. **Global Overrides** take precedence over **Default Themes**.
2. **Dynamic Prop Styles** are re-evaluated on every render if `props` change.
3. **Deep Merging** is used, so valid nested properties (like `config`) are merged rather than replaced, unless a conflict occurs at a primitive level.

## License

MIT © ByteLand Technology Limited
