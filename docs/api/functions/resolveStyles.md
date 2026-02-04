[**tinky-theme**](../README.md)

---

[tinky-theme](../globals.md) / resolveStyles

# Function: resolveStyles()

> **resolveStyles**\<`P`\>(`theme`, `props`): `object`

**`Internal`**

Internal helper to resolve dynamic styles into static objects.

## Type Parameters

### P

`P`

The type of the component props.

## Parameters

### theme

[`ComponentTheme`](../interfaces/ComponentTheme.md)\<`P`\>

The component theme definition containing potential style functions.

### props

`P`

The runtime properties of the component.

## Returns

A new theme object where all style slots are resolved to static [StyleObject](../type-aliases/StyleObject.md)s.

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

This function iterates over a component's style slots. If a slot is defined as a function,
it executes that function with the provided props to generate the final style object.
If the slot is already a static object, it remains unchanged.
