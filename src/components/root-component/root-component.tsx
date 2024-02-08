import { auth } from '@/src/config/firebase-config';
import { appDataStore } from '@/src/stores/appDataStore';
import { css } from '@/src/utils/cssUtils';
import { Component, Host, State, h } from '@stencil/core';
import { onAuthStateChanged } from 'firebase/auth';

@Component({
  tag: 'root-component',
  styleUrl: '../../styles/daisyUi.css',
  shadow: true,
})
export class RootComponent {
  @State() isLoggedIn?: boolean;
  componentWillLoad() {
    onAuthStateChanged(auth, user => {
      this.isLoggedIn = !!user?.uid;
      appDataStore.state.user = user ? user : undefined;
    });
  }
  render() {
    return (
      <Host>
        <pre>{JSON.stringify(appDataStore, undefined, 2)}</pre>
        <br />
        <button
          onClick={() => {
            // state.clicks++;
          }}
        >
          click
        </button>
        {appDataStore.state.isLoggedIn === undefined && (
          <span class="loading loading-spinner loading-lg" />
        )}
        {appDataStore.state.isLoggedIn === false && (
          <div style={css({ display: 'flex', justifyContent: 'center', marginTop: '100px' })}>
            <div style={css({ minWidth: '450px' })}>
              {/* <capture-cycle /> */}
              <user-auth-card />
              {/* <smart-guestbook-capture-cycle></smart-guestbook-capture-cycle> */}
            </div>
          </div>
        )}
        {appDataStore.state.isLoggedIn === true && <event-list />}
      </Host>
    );
  }
}
