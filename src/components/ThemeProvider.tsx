import {
  defaultTheme,
  type Theme,
  ThemeContext,
} from "../contexts/ThemeContext.js";

/**
 * Property definitions for the {@link ThemeProvider} component.
 *
 * @public
 */
export interface ThemeProviderProps {
  /**
   * The child elements to be rendered within the provider's scope.
   */
  children: React.ReactNode;

  /**
   * The theme object to be injected into the context.
   *
   * @remarks
   * This prop accepts a `Partial` of the {@link Theme}, allowing consumers to
   * provide only the subsets of the theme they wish to customize or define.
   * The provided theme is distributed to all nested consumers.
   */
  theme?: Partial<Theme>;
}

/**
 * A wrapper component that injects a theme into the application hierarchy.
 *
 * @remarks
 * The `ThemeProvider` uses React Context to make the theme available to any nested component.
 * It is best practice to wrap your entire application (or a major subtree) with this provider
 * to ensure consistent styling.
 *
 * @param props - The {@link ThemeProviderProps} configuration object.
 * @returns A React Context Provider wrapping the children.
 *
 * @example
 * ```tsx
 * const appTheme = {
 *   components: {
 *     Button: { styles: { root: { color: 'red' } } }
 *   }
 * };
 *
 * <ThemeProvider theme={appTheme}>
 *   <App />
 * </ThemeProvider>
 * ```
 *
 * @public
 */
export function ThemeProvider({
  children,
  theme = defaultTheme,
}: ThemeProviderProps) {
  return (
    <ThemeContext.Provider value={theme as Theme}>
      {children}
    </ThemeContext.Provider>
  );
}
