# capture-cycle-get-stream-settings



<!-- Auto Generated Below -->


## Properties

| Property                   | Attribute      | Description | Type     | Default     |
| -------------------------- | -------------- | ----------- | -------- | ----------- |
| `aspectRatio` _(required)_ | `aspect-ratio` |             | `number` | `undefined` |
| `idealWidth` _(required)_  | `ideal-width`  |             | `number` | `undefined` |


## Events

| Event                  | Description | Type                                                                                                                                                                              |
| ---------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `initSettingsComplete` |             | `CustomEvent<{ videoElementWidth: number; videoElementHeight: number; mediaWidth: number; mediaHeight: number; aspectRatio: number; imageDataUrlLength?: number \| undefined; }>` |
| `initSettingsError`    |             | `CustomEvent<string>`                                                                                                                                                             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
