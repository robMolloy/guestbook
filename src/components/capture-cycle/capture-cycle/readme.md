# capture-cycle



<!-- Auto Generated Below -->


## Dependencies

### Used by

 - [root-component](../../root-component)

### Depends on

- [dumb-capture-cycle](../dumb-capture-cycle)

### Graph
```mermaid
graph TD;
  capture-cycle --> dumb-capture-cycle
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
  root-component --> capture-cycle
  style capture-cycle fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
