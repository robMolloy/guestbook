import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'button-container',
  shadow: true,
})
export class ButtonContainer {
  render() {
    return (
      <Host>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px', gap: '20px' }}>
          <slot />
        </div>
      </Host>
    );
  }
}
