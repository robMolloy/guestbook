import { appDataStore } from '@/src/stores/appDataStore';
import { readAllValidEventDbEntries } from '@/src/utils/firestoreUtils';
import { eventDbEntrySchema } from '@/src/utils/firestoreUtils/firestoreEventsUtils';
import { Component, Host, State, h } from '@stencil/core';
import { z } from 'zod';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
dayjs.extend(calendar);

@Component({
  tag: 'event-list',
  styleUrl: '../../styles/daisyUi.css',
  shadow: true,
})
export class EventList {
  @State() events?: z.infer<typeof eventDbEntrySchema>[] = undefined;

  async componentDidLoad() {
    const validEventDbEntriesResponse = await readAllValidEventDbEntries();
    if (validEventDbEntriesResponse.success) this.events = validEventDbEntriesResponse.data;
  }

  render() {
    return (
      <Host data-theme={appDataStore.state.theme}>
        {this.events === undefined && (
          <button-container>
            <span class="loading loading-spinner loading-lg" />
          </button-container>
        )}

        {!!this.events && this.events.length === 0 && (
          <div>You have not started any events yet, click below to start</div>
        )}

        {!!this.events && this.events.length > 0 && (
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
                {!!this.events &&
                  this.events.length > 0 &&
                  this.events.map((event, j) => (
                    <tr>
                      <th>{j + 1}</th>
                      <td>{event.name}</td>
                      <td>{event.createdAt}</td>
                      <td>
                        <button
                          class="btn btn-primary btn-sm"
                          onClick={() => (appDataStore.state.currentEvent = event)}
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
