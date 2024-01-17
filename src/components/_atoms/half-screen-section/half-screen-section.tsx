import { Component, h } from '@stencil/core';

@Component({
  tag: 'half-screen-section',
  shadow: true,
})
export class HalfScreenSection {
  render() {
    return (
      <div style={{ height: '50vh', border: 'solid 1px blue', display: 'border-box' }}>
        <slot />
      </div>
    );
  }
}
