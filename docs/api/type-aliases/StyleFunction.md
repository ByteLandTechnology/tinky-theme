[**tinky-theme**](../README.md)

---

[tinky-theme](../globals.md) / StyleFunction

# Type Alias: StyleFunction()\<P\>

> **StyleFunction**\<`P`\> = (`props`) => [`StyleObject`](StyleObject.md)

A generic function type for generating dynamic styles based on component props.

## Type Parameters

### P

`P` = `Record`\<`string`, `unknown`\>

The type of the properties passed to the function. Defaults to `Record<string, unknown>`
to safely handle arbitrary props when a specific type is not provided.

## Parameters

### props

`P`

The set of properties used to calculate the resulting style.

## Returns

[`StyleObject`](StyleObject.md)

A computed [StyleObject](StyleObject.md) containing the final style definitions.

## Remarks

This function is used when styles need to be conditional or derived from the component's state
(prop-driven styling). It accepts a generic props object and returns a [StyleObject](StyleObject.md).

## Example

```ts
const buttonStyle: StyleFunction<{ isActive: boolean }> = (props) => ({
  backgroundColor: props.isActive ? "blue" : "gray",
  borderColor: "transparent",
});
```
