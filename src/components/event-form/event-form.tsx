import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'event-form',
  shadow: true,
})
export class EventForm {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
