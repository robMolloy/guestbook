import appDataStore from '@/src/stores/appDataStore';
import { css } from '@/src/utils/cssUtils';
import { Component, h } from '@stencil/core';

@Component({
  tag: 'events-card',
  styleUrl: '../../styles/daisyUi.css',
  shadow: true,
})
export class EventsCard {
  render() {
    return (
      <div
        class="card box"
        style={css({ boxShadow: '7px 7px 13px rgba(0, 0, 0, 0.5)' })}
        data-theme={appDataStore.state.theme}
      >
        <div class="card-body">
          <custom-h2>Events</custom-h2>
          <p>
            Welcome to your events page. Here you can start a new event or view an event that you
            have previously created which allows you to view previous photos or continue taking
            photos for that event.
          </p>
          <create-new-event-form
            onCreateEventSuccess={e => {
              appDataStore.state.currentEvent = e.detail;
              appDataStore.state.eventMode = 'capturing';
            }}
          />
          <br />

          <custom-h3>Previous events</custom-h3>
          <event-list />
        </div>
      </div>
    );
  }
}
