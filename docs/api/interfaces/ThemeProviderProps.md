[**tinky-theme**](../README.md)

---

[tinky-theme](../globals.md) / ThemeProviderProps

# Interface: ThemeProviderProps

Property definitions for the [ThemeProvider](../functions/ThemeProvider.md) component.

## Properties

### children

> **children**: `ReactNode`

The child elements to be rendered within the provider's scope.

---

### theme?

> `optional` **theme**: `Partial`\<[`Theme`](Theme.md)\>

The theme object to be injected into the context.

#### Remarks

This prop accepts a `Partial` of the [Theme](Theme.md), allowing consumers to
provide only the subsets of the theme they wish to customize or define.
The provided theme is distributed to all nested consumers.
