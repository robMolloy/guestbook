import appDataStore from '@/src/stores/appDataStore';
import { css } from '@/src/utils/cssUtils';
import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'rm-card',
})
export class RmCard {
  @Prop() heading?: string;

  render() {
    return (
      <Host>
        <div
          class="card box"
          style={css({ boxShadow: '7px 7px 13px rgba(0, 0, 0, 0.5)' })}
          data-theme={appDataStore.state.theme}
        >
          <div class="card-body">
            {!!this.heading && <custom-h2>{this.heading}</custom-h2>}
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
