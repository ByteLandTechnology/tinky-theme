[**tinky-theme**](../README.md)

---

[tinky-theme](../globals.md) / useComponentTheme

# Function: useComponentTheme()

> **useComponentTheme**\<`P`\>(`componentName`, `defaultTheme`, `props`): `object`

A centralized hook for retrieving and merging component themes.

## Type Parameters

### P

`P`

The type of the component's props.

## Parameters

### componentName

`string`

The unique string identifier for the component (e.g., 'Button').

### defaultTheme

[`ComponentTheme`](../interfaces/ComponentTheme.md)\<`P`\>

The baseline theme definition provided by the component itself.

### props

`P`

The current props of the component instance, used to resolve dynamic styles.

## Returns

The final, merged, and resolved [ComponentTheme](../interfaces/ComponentTheme.md) for the component.

### config?

> `optional` **config**: `Record`\<`string`, `unknown`\> \| (`props`) => `Record`\<`string`, `unknown`\>

A dictionary of configuration parameters for the component.

#### Remarks

Use this to store non-style related settings, such as default icon sets, layout behavior flags,
or distinct logic switches. Like styles, this can be static or dynamic.

#### Example

```ts
const theme: ComponentTheme = {
  config: {
    defaultSize: "medium",
    animateTransitions: true,
  },
};
```

### styles

> **styles**: `Record`\<`string`, [`StyleObject`](../type-aliases/StyleObject.md)\> = `resolvedStyles`

## Remarks

This hook is the primary mechanism for components to access their styling. It performs three key operations:

1. Accesses the global theme from the `ThemeContext`.
2. Retrieves any overrides defined for the specific `componentName`.
3. Deeply merges the component's local `defaultTheme` with the global overrides.
4. Resolves any dynamic style functions using the current `props`.

The result is a fully cohesive theme object ready for application.

## Example

```tsx
function MyComponent(props) {
  const theme = useComponentTheme(
    "MyComponent",
    defaultMyComponentTheme,
    props,
  );
  return <div style={theme.styles.root} />;
}
```
