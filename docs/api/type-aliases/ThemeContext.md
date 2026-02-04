[**tinky-theme**](../README.md)

---

[tinky-theme](../globals.md) / ThemeContext

# Type Alias: ThemeContext

> **ThemeContext** = `Context`\<[`Theme`](../interfaces/Theme.md)\>

**`Internal`**

The React Context used to propagate the theme down the component tree.

## Remarks

This context holds the current [Theme](../interfaces/Theme.md) object. Components consume this context
implicitly via the [useComponentTheme](../functions/useComponentTheme.md) hook.
