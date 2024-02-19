import { appDataStore } from '@/src/stores/appDataStore';
import { Component, Host, h } from '@stencil/core';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
dayjs.extend(calendar);

@Component({
  tag: 'event-list',
  styleUrl: '../../styles/daisyUi.css',
  shadow: true,
})
export class EventList {
  render() {
    return (
      <Host data-theme={appDataStore.state.theme}>
        {appDataStore.state.allEvents === undefined && (
          <button-container>
            <span class="loading loading-spinner loading-lg" />
          </button-container>
        )}

        {!!appDataStore.state.allEvents && appDataStore.state.allEvents.length === 0 && (
          <div>You have not started any events yet, click below to start</div>
        )}

        {!!appDataStore.state.allEvents && appDataStore.state.allEvents.length > 0 && (
          <div class="overflow-x-auto">
            <table class="table">
              <thead>
                <tr>
                  <th># </th>
                  <th>Name</th>
                  <th>Created At</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {!!appDataStore.state.allEvents &&
                  appDataStore.state.allEvents.length > 0 &&
                  appDataStore.state.allEvents.map((event, j) => (
                    <tr>
                      <th>{j + 1}</th>
                      <td>{event.name}</td>
                      <td>{event.createdAt}</td>
                      <td>
                        <button
                          class="btn btn-primary btn-sm"
                          onClick={() => {
                            appDataStore.state.currentEvent = event;
                            appDataStore.state.eventMode = 'managing';
                          }}
                        >
                          View Event
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </Host>
    );
  }
}
