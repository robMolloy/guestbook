# manage-event



<!-- Auto Generated Below -->


## Dependencies

### Used by

 - [root-component](../root-component)

### Depends on

- [rm-layout](../_atoms/rm-layout)
- [rm-card](../_atoms/rm-card)
- [button-container](../_atoms/button-container)
- [rm-button](../_atoms/rm-button)
- [manage-event-image-accordian](../manage-event-image-accordian)

### Graph
```mermaid
graph TD;
  manage-event --> rm-layout
  manage-event --> rm-card
  manage-event --> button-container
  manage-event --> rm-button
  manage-event --> manage-event-image-accordian
  rm-card --> custom-h2
  manage-event-image-accordian --> rm-accordian
  manage-event-image-accordian --> rm-modal-button
  manage-event-image-accordian --> rm-button
  root-component --> manage-event
  style manage-event fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
