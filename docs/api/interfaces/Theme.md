[**tinky-theme**](../README.md)

---

[tinky-theme](../globals.md) / Theme

# Interface: Theme

Represents the global theme schema for the entire application.

## Remarks

The global theme serves as the central repository for all component themes.
It is structured as a collection of component keys mapped to their respective [ComponentTheme](ComponentTheme.md) definitions.
This structure enables modular partial updates and overrides.

## Properties

### components

> **components**: `Record`\<`string`, [`ComponentTheme`](ComponentTheme.md)\>

A registry of component themes.

#### Remarks

The keys in this record should correspond to the unique component identifiers used
throughout the application (e.g., 'Button', 'Card', 'Input').
