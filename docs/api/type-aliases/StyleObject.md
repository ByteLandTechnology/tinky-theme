[**tinky-theme**](../README.md)

---

[tinky-theme](../globals.md) / StyleObject

# Type Alias: StyleObject

> **StyleObject** = `BoxProps` \| `TextProps` \| `Record`\<`string`, `unknown`\>

Represents a normalized style object for a component slot.

## Remarks

This type definition aggregates the standard style properties available in the Tinky UI system.
It includes layout properties from `BoxProps`, typographic properties from `TextProps`, and
allows for arbitrary CSS-like properties via a record. This flexibility ensures that
consumers can define both structural and visual styles within a single object.
