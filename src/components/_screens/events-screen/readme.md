# events-screen



<!-- Auto Generated Below -->


## Dependencies

### Used by

 - [root-component](../../root-component)

### Depends on

- [rm-layout](../../_atoms/rm-layout)
- [events-card](../../events-card)

### Graph
```mermaid
graph TD;
  events-screen --> rm-layout
  events-screen --> events-card
  events-card --> custom-h2
  events-card --> create-new-event-form
  events-card --> custom-h3
  events-card --> event-list
  event-list --> button-container
  root-component --> events-screen
  style events-screen fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
