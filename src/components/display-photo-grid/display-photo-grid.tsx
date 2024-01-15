import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'display-photo-grid',
  shadow: true,
})
export class DisplayPhotoGrid {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
