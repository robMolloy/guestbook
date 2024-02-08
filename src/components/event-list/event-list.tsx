import { auth } from '@/src/config/firebase-config';
import { appDataStore } from '@/src/stores/appDataStore';
import { css } from '@/src/utils/cssUtils';
import { logoutFirebaseUser } from '@/src/utils/firebaseAuthUtils';
import { readAllValidEventDbEntries } from '@/src/utils/firestoreUtils';
import { createEventDbEntryAndConfirm } from '@/src/utils/firestoreUtils/firestoreEventsUtils';
import { Component, State, h } from '@stencil/core';
import { v4 as uuid } from 'uuid';

@Component({
  tag: 'event-list',
  styleUrl: '../../styles/daisyUi.css',
  shadow: true,
})
export class EventList {
  @State() events?: {
    id: string;
    uid: string;
    name: string;
    createdAt: { seconds: number };
    updatedAt: { seconds: number };
  }[] = undefined;
  @State() showStartNeweventForm = true;

  async componentDidLoad() {
    const validEventDbEntriesResponse = await readAllValidEventDbEntries();
    if (validEventDbEntriesResponse.success) this.events = validEventDbEntriesResponse.data;
  }

  render() {
    return (
      <div data-theme="synthwave">
        <pre>{JSON.stringify(appDataStore, undefined, 2)}</pre>
        <div>
          <button-container>
            <button onClick={() => logoutFirebaseUser()} class="btn btn-primary">
              Log out
            </button>

            <button
              onClick={async () => {
                const uid = auth.currentUser?.uid;
                if (!uid) return;
                const payload = { id: uuid(), uid, name: `some event: ${uuid()}` };
                const createResponse = await createEventDbEntryAndConfirm(payload);

                if (!createResponse.success) return;

                this.events = [...(this.events ?? []), createResponse.data];
              }}
              class="btn btn-primary"
            >
              Add event
            </button>
            <button
              onClick={async () => (this.showStartNeweventForm = !this.showStartNeweventForm)}
              class="btn btn-primary"
            >
              Start new event
            </button>
          </button-container>

          {this.events === undefined && (
            <div>You don't seem to have any events at the moment, start a new event belo</div>
          )}

          {this.showStartNeweventForm && (
            <div style={css({ width: '450px' })}>
              <br />
              <create-new-event-form
                onCreateEventSuccess={e => {
                  console.log({ e: e.detail });
                  this.events = [...(this.events ?? []), e.detail];
                  appDataStore.state.currentEvent = e.detail;
                }}
              />
            </div>
          )}

          {!!this.events && this.events.length === 0 && (
            <div>You have not started any events yet, click below to start</div>
          )}
          {!!this.events &&
            this.events.length > 0 &&
            this.events.map(event => <div>{event.name}</div>)}
        </div>
      </div>
    );
  }
}
