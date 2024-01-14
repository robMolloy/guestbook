import { Component, h } from '@stencil/core';

@Component({
  tag: 'root-component',
  shadow: true,
})
export class RootComponent {
  render() {
    return (
      <div>
        <smart-guestbook-capture-cycle></smart-guestbook-capture-cycle>
      </div>
    );
  }
}
