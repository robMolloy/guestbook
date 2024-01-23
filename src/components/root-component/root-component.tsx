import { Component, h } from '@stencil/core';

@Component({
  tag: 'root-component',
  shadow: true,
})
export class RootComponent {
  render() {
    return (
      <div data-theme="synthwave">
        {/* <capture-cycle /> */}
        <login-form />
        {/* <smart-guestbook-capture-cycle></smart-guestbook-capture-cycle> */}
      </div>
    );
  }
}
