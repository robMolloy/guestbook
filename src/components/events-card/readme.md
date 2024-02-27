# events-card



<!-- Auto Generated Below -->


## Dependencies

### Used by

 - [events-screen](../_screens/events-screen)

### Depends on

- [custom-h2](../_atoms/custom-h2)
- [create-new-event-form](../create-new-event-form)
- [custom-h3](../_atoms/custom-h3)
- [event-list](../event-list)

### Graph
```mermaid
graph TD;
  events-card --> custom-h2
  events-card --> create-new-event-form
  events-card --> custom-h3
  events-card --> event-list
  event-list --> button-container
  events-screen --> events-card
  style events-card fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
