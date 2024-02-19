import appDataStore from '@/src/stores/appDataStore';
import { css } from '@/src/utils/cssUtils';
import {
  TSelectedImageDbEntry,
  readAllValidSelectedImageDbEntries,
} from '@/src/utils/firestoreUtils';
import { Component, Host, State, h } from '@stencil/core';

@Component({
  tag: 'manage-event',
})
export class ManageEvent {
  @State() status: 'loading' | 'error' | 'success' = 'loading';
  @State() selectedImageDbEntries?: TSelectedImageDbEntry[];
  // @State() selectedImageDbEntries?: {
  //   id: string;
  //   groupId: string;
  //   eventId: string;
  //   userId: string;
  //   storagePath: string;
  //   downloadUrl: string;
  // }[];

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
        <Host style={css({ flex: '1', display: 'flex' })}>
          <rm-layout>
            <rm-card heading="Manage Event">
              <div>
                This page allows you to manage any open events. You can view any previously taken
                photos
              </div>
              <button-container>
                <rm-button
                  onClick={e => {
                    appDataStore.state.eventMode = 'capturing';
                  }}
                >
                  asjkdhkash
                </rm-button>
              </button-container>
              {this.selectedImageDbEntries?.map(x => (
                <div>
                  <img src={x.downloadUrl} />
                  <br />
                </div>
              ))}
              {<pre>{JSON.stringify(this.selectedImageDbEntries, undefined, 2)}</pre>}
            </rm-card>
          </rm-layout>
        </Host>
      );
  }
}
