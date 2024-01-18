import { Component, h } from '@stencil/core';

@Component({
  tag: 'custom-h2',
  shadow: true,
})
export class CustomH2 {
  render() {
    return (
      <div style={{ fontSize: '1.4rem', textAlign: 'center' }}>
        <slot />
      </div>
    );
  }
}
