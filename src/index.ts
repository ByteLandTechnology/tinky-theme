/**
 * @module tinky-theme
 * @packageDocumentation
 *
 * The `tinky-theme` package provides the foundational theming architecture for the Tinky UI library.
 * It implements a flexible, slot-based styling system that supports:
 * - Dynamic, prop-driven styles
 * - Deep theme merging and overrides
 * - A React Context-based provider for global theme distribution
 *
 * This entry point exports all public APIs, types, and hooks required to integrate
 * the theming system into your React application or component library.
 */

export {
  type ComponentTheme,
  type StyleFunction,
  type StyleObject,
  type Theme,
  type ThemeContext,
  defaultTheme,
} from "./contexts/ThemeContext.js";
export {
  ThemeProvider,
  type ThemeProviderProps,
} from "./components/ThemeProvider.js";
export { useComponentTheme } from "./hooks/useComponentTheme.js";
export { extendTheme } from "./utils/extend-theme.js";
export { resolveStyles } from "./utils/resolve-styles.js";
