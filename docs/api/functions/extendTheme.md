[**tinky-theme**](../README.md)

---

[tinky-theme](../globals.md) / extendTheme

# Function: extendTheme()

> **extendTheme**(`originalTheme`, `newTheme`): [`Theme`](../interfaces/Theme.md)

Utility to combine two theme objects into a single unified theme.

## Parameters

### originalTheme

[`Theme`](../interfaces/Theme.md)

The foundation theme object.

### newTheme

[`Theme`](../interfaces/Theme.md)

The theme object containing updates or overrides.

## Returns

[`Theme`](../interfaces/Theme.md)

A generic object representing the deep-merged result of both themes.

## Remarks

This function wraps the deep merge logic tailored for theme objects. It is useful when
constructing a custom theme composed of multiple partial themes or presets.
Use this to layer customizations on top of a base theme.

## Example

```ts
const finalTheme = extendTheme(baseTheme, userOverrides);
```
