import { describe, expect, test } from "bun:test";
import { Text } from "tinky";
import { render } from "tinky-test";
import {
  ThemeProvider,
  defaultTheme,
  extendTheme,
  useComponentTheme,
  type ComponentTheme,
} from "../src";

describe("Theme System", () => {
  describe("defaultTheme", () => {
    test("is empty by default", () => {
      expect(defaultTheme.components).toEqual({});
    });
  });

  describe("extendTheme", () => {
    test("merges new components", () => {
      const baseTheme = {
        components: {
          BaseComp: {
            styles: {},
          },
        },
      };

      const customTheme = extendTheme(baseTheme, {
        components: {
          Custom: {
            styles: {
              label: { color: "red" },
            },
          },
        },
      });

      expect(customTheme.components.Custom).toBeDefined();
      expect(customTheme.components.BaseComp).toBeDefined();
    });

    test("deep merges component styles", () => {
      const baseTheme = {
        components: {
          Button: {
            styles: {
              root: {
                padding: 10,
                backgroundColor: "blue",
              },
            },
          },
        },
      };

      const overrideTheme = {
        components: {
          Button: {
            styles: {
              root: {
                backgroundColor: "red",
                margin: 5,
              },
            },
          },
        },
      };

      const mergedTheme = extendTheme(baseTheme, overrideTheme);
      const btnStyles = mergedTheme.components.Button?.styles?.root as Record<
        string,
        unknown
      >;

      expect(btnStyles.padding).toBe(10); // Preserved
      expect(btnStyles.margin).toBe(5); // Added
      expect(btnStyles.backgroundColor).toBe("red"); // Overridden
    });

    test("handles function styles in merge", () => {
      const baseFn = () => ({ color: "blue" });
      const overrideFn = () => ({ color: "red" });

      const baseTheme = {
        components: {
          TestData: {
            styles: {
              root: baseFn,
            },
          },
        },
      };

      const overrideTheme = {
        components: {
          TestData: {
            styles: {
              root: overrideFn,
            },
          },
        },
      };

      const mergedTheme = extendTheme(baseTheme, overrideTheme);
      // deepmerge usually replaces the function with the new one
      const mergedFn = mergedTheme.components.TestData?.styles?.root;
      expect(mergedFn).toBe(overrideFn);
    });

    test("does not mutate original themes", () => {
      const baseTheme = { components: { A: {} } };
      const newTheme = { components: { B: {} } };

      const merged = extendTheme(baseTheme, newTheme);

      expect(merged).not.toBe(baseTheme);
      expect(merged).not.toBe(newTheme);
      expect(baseTheme.components).not.toHaveProperty("B");
      expect(newTheme.components).not.toHaveProperty("A");
    });
  });

  describe("useComponentTheme", () => {
    test("reads from provider and resolves styles", () => {
      const customTheme = {
        components: {
          Custom: {
            styles: {
              label: () => ({
                color: "magenta",
              }),
            },
          },
        },
      };

      type CustomTheme = ComponentTheme<{ isActive?: boolean }>;

      function CustomLabel() {
        // Mock default theme for the component
        const defaultComponentTheme: CustomTheme = {
          styles: {
            label: { color: "black" },
          },
        };

        const theme = useComponentTheme("Custom", defaultComponentTheme, {});

        // resolveStyles should have executed the function from customTheme
        const style = (theme.styles?.label || {}) as Record<string, unknown>;
        return <Text>{String(style.color)}</Text>;
      }

      const { lastFrame } = render(
        <ThemeProvider theme={customTheme}>
          <CustomLabel />
        </ThemeProvider>,
      );

      expect(lastFrame()).toBe("magenta");
    });

    test("prioritizes global theme override over component default", () => {
      const globalTheme = {
        components: {
          Box: {
            styles: {
              root: { borderColor: "green" },
            },
          },
        },
      };

      const defaultBoxTheme = {
        styles: {
          root: { borderColor: "red", borderWidth: 1 },
        },
      };

      function ThemedBox() {
        const theme = useComponentTheme("Box", defaultBoxTheme, {});
        const style = (theme.styles?.root || {}) as Record<string, unknown>;
        return <Text>{`${style.borderColor}-${style.borderWidth}`}</Text>;
      }

      const { lastFrame } = render(
        <ThemeProvider theme={globalTheme}>
          <ThemedBox />
        </ThemeProvider>,
      );

      // Should have green from global and borderWidth 1 from default
      expect(lastFrame()).toBe("green-1");
    });

    test("resolves functional styles with props", () => {
      const globalTheme = {
        components: {
          DynamicComp: {
            styles: {
              text: (props: Record<string, unknown>) => ({
                color: (props as { active: boolean }).active ? "lime" : "gray",
              }),
            },
          },
        },
      };

      const defaultThemeDef = { styles: {} };

      function DynamicComp({ active }: { active: boolean }) {
        const theme = useComponentTheme("DynamicComp", defaultThemeDef, {
          active,
        });
        const style = (theme.styles?.text || {}) as Record<string, unknown>;
        return <Text>{String(style.color)}</Text>;
      }

      const { lastFrame, rerender } = render(
        <ThemeProvider theme={globalTheme}>
          <DynamicComp active={true} />
        </ThemeProvider>,
      );

      expect(lastFrame()).toBe("lime");

      rerender(
        <ThemeProvider theme={globalTheme}>
          <DynamicComp active={false} />
        </ThemeProvider>,
      );

      expect(lastFrame()).toBe("gray");
    });
  });
});
