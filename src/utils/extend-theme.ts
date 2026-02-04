import { merge } from "lodash";
import { Theme } from "../contexts/ThemeContext";

/**
 * Utility to combine two theme objects into a single unified theme.
 *
 * @remarks
 * This function wraps the deep merge logic tailored for theme objects. It is useful when
 * constructing a custom theme composed of multiple partial themes or presets.
 * Use this to layer customizations on top of a base theme.
 *
 * @param originalTheme - The foundation theme object.
 * @param newTheme - The theme object containing updates or overrides.
 * @returns A generic object representing the deep-merged result of both themes.
 *
 * @example
 * ```ts
 * const finalTheme = extendTheme(baseTheme, userOverrides);
 * ```
 *
 * @public
 */
export const extendTheme = (originalTheme: Theme, newTheme: Theme) => {
  return merge({}, originalTheme, newTheme);
};
