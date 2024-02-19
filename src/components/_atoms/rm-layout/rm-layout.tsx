import { css } from '@/src/utils/cssUtils';
import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'rm-layout',
})
export class RmLayout {
  render() {
    return (
      <Host style={css({ display: 'flex', justifyContent: 'center', padding: '20px' })}>
        <div style={css({ maxWidth: '600px' })}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
