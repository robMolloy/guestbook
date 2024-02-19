import { auth } from '@/src/config/firebase-config';
import { appDataStore } from '@/src/stores/appDataStore';
import { css } from '@/src/utils/cssUtils';
import { readAllValidEventDbEntries } from '@/src/utils/firestoreUtils';
import { Component, Host, h } from '@stencil/core';
import { onAuthStateChanged } from 'firebase/auth';

@Component({
  tag: 'root-component',
  styleUrl: '../../styles/daisyUi.css',
  shadow: true,
})
export class RootComponent {
  componentWillLoad() {
    onAuthStateChanged(auth, async user => {
      if (!user) appDataStore.reset();
      appDataStore.set('user', !!user ? user : null);

      if (!!user) {
        const response = await readAllValidEventDbEntries();

        if (!response.success) return;
        appDataStore.state.allEvents = response.data;
      }
    });
  }
  render() {
    return (
      <Host data-theme={appDataStore.state.theme}>
        <div
          style={css({
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          })}
        >
          <nav-bar />
          <div style={css({ flex: '1', display: 'flex' })}>
            {appDataStore.state.status === 'loading' && <loading-screen />}
            {appDataStore.state.status === 'logged_out' && (
              <user-auth-screen style={css({ minWidth: '100%' })} />
            )}
            {appDataStore.state.status === 'choosing_event' && (
              <events-screen style={css({ minWidth: '100%' })} />
            )}
            {appDataStore.state.status === 'capturing_event' && <capture-cycle />}
            {appDataStore.state.status === 'managing_event' && (
              <manage-event style={css({ minWidth: '100%' })} />
            )}
          </div>
        </div>
      </Host>
    );
  }
}
