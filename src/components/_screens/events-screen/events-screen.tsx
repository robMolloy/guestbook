import { css } from '@/src/utils/cssUtils';
import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'events-screen',
  styleUrl: '../../../styles/daisyUi.css',
  shadow: true,
})
export class EventsScreen {
  render() {
    return (
      <Host style={css({ display: 'flex', justifyContent: 'center', padding: '20px' })}>
        <div style={css({ maxWidth: '600px' })}>
          <events-card />
        </div>
      </Host>
    );
  }
}
