import { css } from '@/src/utils/cssUtils';
import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'test-comp',
  shadow: true,
})
export class TestComp {
  render() {
    return (
      <Host style={css({ background: 'blue', flex: '1' })}>
        <div>test-comp</div>
      </Host>
    );
  }
}
