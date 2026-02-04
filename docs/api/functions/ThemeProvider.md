[**tinky-theme**](../README.md)

---

[tinky-theme](../globals.md) / ThemeProvider

# Function: ThemeProvider()

> **ThemeProvider**(`props`): `Element`

A wrapper component that injects a theme into the application hierarchy.

## Parameters

### props

[`ThemeProviderProps`](../interfaces/ThemeProviderProps.md)

The [ThemeProviderProps](../interfaces/ThemeProviderProps.md) configuration object.

## Returns

`Element`

A React Context Provider wrapping the children.

## Remarks

The `ThemeProvider` uses React Context to make the theme available to any nested component.
It is best practice to wrap your entire application (or a major subtree) with this provider
to ensure consistent styling.

## Example

```tsx
const appTheme = {
  components: {
    Button: { styles: { root: { color: "red" } } },
  },
};

<ThemeProvider theme={appTheme}>
  <App />
</ThemeProvider>;
```
