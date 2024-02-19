import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'events-screen',
})
export class EventsScreen {
  render() {
    return (
      <Host>
        <rm-layout>
          <events-card />
        </rm-layout>
      </Host>
    );
  }
}
