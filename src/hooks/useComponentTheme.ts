import { merge } from "lodash";
import { useContext, useMemo } from "react";
import { ComponentTheme, ThemeContext } from "../contexts/ThemeContext.js";
import { resolveStyles } from "../utils/resolve-styles.js";

/**
 * A centralized hook for retrieving and merging component themes.
 *
 * @remarks
 * This hook is the primary mechanism for components to access their styling. It performs three key operations:
 * 1. Accesses the global theme from the `ThemeContext`.
 * 2. Retrieves any overrides defined for the specific `componentName`.
 * 3. Deeply merges the component's local `defaultTheme` with the global overrides.
 * 4. Resolves any dynamic style functions using the current `props`.
 *
 * The result is a fully cohesive theme object ready for application.
 *
 * @template P - The type of the component's props.
 * @param componentName - The unique string identifier for the component (e.g., 'Button').
 * @param defaultTheme - The baseline theme definition provided by the component itself.
 * @param props - The current props of the component instance, used to resolve dynamic styles.
 * @returns The final, merged, and resolved {@link ComponentTheme} for the component.
 *
 * @example
 * ```tsx
 * function MyComponent(props) {
 *   const theme = useComponentTheme('MyComponent', defaultMyComponentTheme, props);
 *   return <div style={theme.styles.root} />;
 * }
 * ```
 *
 * @public
 */
export function useComponentTheme<P>(
  componentName: string,
  defaultTheme: ComponentTheme<P>,
  props: P,
) {
  const globalTheme = useContext(ThemeContext);

  return useMemo(() => {
    // 1. Retrieve the override configuration for this component from the global theme.
    const overrideTheme = globalTheme.components?.[componentName] as
      | ComponentTheme<P>
      | undefined;

    // 2. If no override exists, return the resolved default theme immediately for better performance.
    if (!overrideTheme) {
      return resolveStyles(defaultTheme, props);
    }

    // 3. If an override exists, perform a deep merge.
    // Strategy: User configuration overrides the component's default configuration.
    // Use merge({}, ...) to avoid mutating the original defaultTheme.
    const mergedTheme = merge({}, defaultTheme, overrideTheme);

    return resolveStyles(mergedTheme, props);
  }, [componentName, defaultTheme, globalTheme, props]);
}
