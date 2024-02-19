import appDataStore from '@/src/stores/appDataStore';
import {
  TSelectedImageDbEntry,
  readAllValidSelectedImageDbEntries,
} from '@/src/utils/firestoreUtils';
import { Component, Host, State, h } from '@stencil/core';

@Component({
  tag: 'manage-event',
})
export class ManageEvent {
  @State() checked = false;
  @State() status: 'loading' | 'error' | 'success' = 'loading';
  @State() selectedImageDbEntries?: TSelectedImageDbEntry[];

  async componentDidLoad() {
    if (!appDataStore.state.currentEventId || !appDataStore.state.user?.uid)
      return (this.status = 'error');

    const selectedImageDbEntriesResponse = await readAllValidSelectedImageDbEntries({
      eventId: appDataStore.state.currentEventId,
      userId: appDataStore.state.user?.uid,
    });
    console.log(`manage-event.tsx:${/*LL*/ 21}`, { selectedImageDbEntriesResponse });
    if (!selectedImageDbEntriesResponse.success) return (this.status = 'error');
    this.selectedImageDbEntries = selectedImageDbEntriesResponse.data;
    this.status = 'success';
  }

  render() {
    if (this.status === 'loading') return <div>loading...</div>;
    if (this.status === 'error') return <div>error...</div>;
    if (this.status === 'success')
      return (
        <Host>
          <rm-layout>
            <rm-card heading="Manage Event">
              <div>
                This page allows you to manage any open events. View any photos or continue with
                your event by clicking the button below.
              </div>
              <button-container>
                <rm-button onClick={() => (appDataStore.state.eventMode = 'capturing')}>
                  Continue
                </rm-button>
              </button-container>
              {this.selectedImageDbEntries?.map(x => (
                <manage-event-image-accordian selectedImageDbEntry={x} />
              ))}
            </rm-card>
          </rm-layout>
        </Host>
      );
  }
}
