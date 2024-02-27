# dumb-capture-cycle



<!-- Auto Generated Below -->


## Properties

| Property                      | Attribute | Description | Type                                                                                                                       | Default     |
| ----------------------------- | --------- | ----------- | -------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `streamSettings` _(required)_ | --        |             | `{ videoElementWidth: number; videoElementHeight: number; mediaWidth: number; mediaHeight: number; aspectRatio: number; }` | `undefined` |


## Dependencies

### Used by

 - [capture-cycle](../capture-cycle)

### Depends on

- [custom-h1](../../_atoms/custom-h1)
- [capture-cycle-display-stream](../capture-cycle-display-stream)
- [capture-cycle-display-selected-photo](../capture-cycle-display-selected-photo)
- [button-container](../../_atoms/button-container)
- [capture-cycle-display-photo-grid](../capture-cycle-display-photo-grid)
- [capture-cycle-confirm-photo-success-screen](../capture-cycle-confirm-photo-success-screen)
- [capture-cycle-confirm-photo-fail-screen](../capture-cycle-confirm-photo-fail-screen)

### Graph
```mermaid
graph TD;
  dumb-capture-cycle --> custom-h1
  dumb-capture-cycle --> capture-cycle-display-stream
  dumb-capture-cycle --> capture-cycle-display-selected-photo
  dumb-capture-cycle --> button-container
  dumb-capture-cycle --> capture-cycle-display-photo-grid
  dumb-capture-cycle --> capture-cycle-confirm-photo-success-screen
  dumb-capture-cycle --> capture-cycle-confirm-photo-fail-screen
  capture-cycle-display-selected-photo --> custom-h2
  capture-cycle-confirm-photo-success-screen --> custom-h1
  capture-cycle-confirm-photo-success-screen --> custom-h2
  capture-cycle --> dumb-capture-cycle
  style dumb-capture-cycle fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
