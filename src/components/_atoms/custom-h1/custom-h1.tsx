import { Component, h } from '@stencil/core';

@Component({
  tag: 'custom-h1',
  styleUrl: '../../../styles/daisyUi.css',
  shadow: true,
})
export class GlobalH1 {
  render() {
    return (
      <div style={{ fontSize: '2.2rem', textAlign: 'center' }}>
        <slot />
      </div>
    );
  }
}
