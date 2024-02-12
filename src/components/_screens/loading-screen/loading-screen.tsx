import { css } from '@/src/utils/cssUtils';
import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'loading-screen',
  styleUrl: '../../../styles/daisyUi.css',
  shadow: true,
})
export class LoadingScreen {
  render() {
    return (
      <Host style={css({ minWidth: '100%', paddingTop: '100px' })}>
        <button-container>
          <span class="loading loading-spinner loading-lg" />
        </button-container>
      </Host>
    );
  }
}
