[**tinky-theme**](../README.md)

---

[tinky-theme](../globals.md) / ComponentTheme

# Interface: ComponentTheme\<P\>

Defines the comprehensive theme structure for a specific component.

## Remarks

A `ComponentTheme` is the blueprint for how a component is styled and configured within the system.
It strictly separates visual styles from configuration options. Both styles and configuration
can be defined statically or dynamically (via functions of props).

## Type Parameters

### P

`P` = `Record`\<`string`, `unknown`\>

The interface of the props used to resolve dynamic styles or configuration.

## Properties

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

---

### styles?

> `optional` **styles**: `Record`\<`string`, [`StyleObject`](../type-aliases/StyleObject.md) \| [`StyleFunction`](../type-aliases/StyleFunction.md)\<`P`\>\>

A dictionary of style definitions for the component's internal slots.

#### Remarks

Keys represent the slot names (e.g., `root`, `icon`, `label`), and values can be
either a static [StyleObject](../type-aliases/StyleObject.md) or a [StyleFunction](../type-aliases/StyleFunction.md).

#### Example

```ts
const theme: ComponentTheme = {
  styles: {
    container: { padding: 16 },
    text: (props) => ({ color: props.disabled ? "gray" : "black" }),
  },
};
```
