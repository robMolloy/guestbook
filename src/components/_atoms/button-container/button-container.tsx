import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'button-container',
})
export class ButtonContainer {
  @Prop() paddingX = 20;
  @Prop() paddingY = 20;
  render() {
    return (
      <Host>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingX: `${this.paddingX}px`,
            paddingY: `${this.paddingY}px`,
            gap: '20px',
          }}
        >
          <slot />
        </div>
      </Host>
    );
  }
}
