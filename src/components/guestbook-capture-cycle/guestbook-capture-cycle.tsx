import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'guestbook-capture-cycle',
  shadow: true,
})
export class GuestbookCaptureCycle {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
