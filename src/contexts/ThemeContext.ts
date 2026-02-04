import { createContext } from "react";
import { type BoxProps, type TextProps } from "tinky";

/**
 * Represents a normalized style object for a component slot.
 *
 * @remarks
 * This type definition aggregates the standard style properties available in the Tinky UI system.
 * It includes layout properties from `BoxProps`, typographic properties from `TextProps`, and
 * allows for arbitrary CSS-like properties via a record. This flexibility ensures that
 * consumers can define both structural and visual styles within a single object.
 *
 * @public
 */
export type StyleObject = BoxProps | TextProps | Record<string, unknown>;

/**
 * A generic function type for generating dynamic styles based on component props.
 *
 * @remarks
 * This function is used when styles need to be conditional or derived from the component's state
 * (prop-driven styling). It accepts a generic props object and returns a {@link StyleObject}.
 *
 * @template P - The type of the properties passed to the function. Defaults to `Record<string, unknown>`
 *               to safely handle arbitrary props when a specific type is not provided.
 * @param props - The set of properties used to calculate the resulting style.
 * @returns A computed {@link StyleObject} containing the final style definitions.
 *
 * @example
 * ```ts
 * const buttonStyle: StyleFunction<{ isActive: boolean }> = (props) => ({
 *   backgroundColor: props.isActive ? 'blue' : 'gray',
 *   borderColor: 'transparent'
 * });
 * ```
 *
 * @public
 */
export type StyleFunction<P = Record<string, unknown>> = (
  props: P,
) => StyleObject;

/**
 * Defines the comprehensive theme structure for a specific component.
 *
 * @remarks
 * A `ComponentTheme` is the blueprint for how a component is styled and configured within the system.
 * It strictly separates visual styles from configuration options. Both styles and configuration
 * can be defined statically or dynamically (via functions of props).
 *
 * @template P - The interface of the props used to resolve dynamic styles or configuration.
 *
 * @public
 */
export interface ComponentTheme<P = Record<string, unknown>> {
  /**
   * A dictionary of style definitions for the component's internal slots.
   *
   * @remarks
   * Keys represent the slot names (e.g., `root`, `icon`, `label`), and values can be
   * either a static {@link StyleObject} or a {@link StyleFunction}.
   *
   * @example
   * ```ts
   * const theme: ComponentTheme = {
   *   styles: {
   *     container: { padding: 16 },
   *     text: (props) => ({ color: props.disabled ? 'gray' : 'black' })
   *   }
   * };
   * ```
   */
  styles?: Record<string, StyleFunction<P> | StyleObject>;

  /**
   * A dictionary of configuration parameters for the component.
   *
   * @remarks
   * Use this to store non-style related settings, such as default icon sets, layout behavior flags,
   * or distinct logic switches. Like styles, this can be static or dynamic.
   *
   * @example
   * ```ts
   * const theme: ComponentTheme = {
   *   config: {
   *     defaultSize: 'medium',
   *     animateTransitions: true
   *   }
   * };
   * ```
   */
  config?: Record<string, unknown> | ((props: P) => Record<string, unknown>);
}

/**
 * Represents the global theme schema for the entire application.
 *
 * @remarks
 * The global theme serves as the central repository for all component themes.
 * It is structured as a collection of component keys mapped to their respective {@link ComponentTheme} definitions.
 * This structure enables modular partial updates and overrides.
 *
 * @public
 */
export interface Theme {
  /**
   * A registry of component themes.
   *
   * @remarks
   * The keys in this record should correspond to the unique component identifiers used
   * throughout the application (e.g., 'Button', 'Card', 'Input').
   */
  components: Record<string, ComponentTheme>;
}

/**
 * The standard default instance of a {@link Theme}.
 *
 * @remarks
 * This constant provides an initial empty state for the theme context.
 * It is primarily used as a fallback when no `ThemeProvider` is present in the component tree.
 *
 * @public
 */
export const defaultTheme: Theme = { components: {} };

/**
 * The React Context used to propagate the theme down the component tree.
 *
 * @remarks
 * This context holds the current {@link Theme} object. Components consume this context
 * implicitly via the {@link useComponentTheme} hook.
 *
 * @internal
 */
export const ThemeContext = createContext<Theme>(defaultTheme);
