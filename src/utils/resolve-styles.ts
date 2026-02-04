import {
  type ComponentTheme,
  type StyleFunction,
  type StyleObject,
} from "../contexts/ThemeContext.js";

/**
 * Internal helper to resolve dynamic styles into static objects.
 *
 * @remarks
 * This function iterates over a component's style slots. If a slot is defined as a function,
 * it executes that function with the provided props to generate the final style object.
 * If the slot is already a static object, it remains unchanged.
 *
 * @template P - The type of the component props.
 * @param theme - The component theme definition containing potential style functions.
 * @param props - The runtime properties of the component.
 * @returns A new theme object where all style slots are resolved to static {@link StyleObject}s.
 *
 * @internal
 */
export function resolveStyles<P>(theme: ComponentTheme<P>, props: P) {
  const resolvedStyles: Record<string, StyleObject> = {};

  const styles = theme.styles;
  if (styles) {
    Object.keys(styles).forEach((slot) => {
      const styleOrFn = styles[slot];
      resolvedStyles[slot] =
        typeof styleOrFn === "function"
          ? (styleOrFn as StyleFunction<P>)(props)
          : styleOrFn;
    });
  }

  return { ...theme, styles: resolvedStyles };
}
