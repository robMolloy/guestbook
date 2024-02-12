import { Component, h } from '@stencil/core';

@Component({
  tag: 'custom-h3',
  shadow: true,
})
export class CustomH2 {
  render() {
    return (
      <div style={{ fontSize: '1.2rem', textAlign: 'center' }}>
        <slot />
      </div>
    );
  }
}
