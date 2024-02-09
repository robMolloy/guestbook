import { auth } from '@/src/config/firebase-config';
import { appDataStore } from '@/src/stores/appDataStore';
import { css } from '@/src/utils/cssUtils';
import { Component, Host, h } from '@stencil/core';
import { onAuthStateChanged } from 'firebase/auth';

@Component({
  tag: 'root-component',
  styleUrl: '../../styles/daisyUi.css',
  shadow: true,
})
export class RootComponent {
  componentWillLoad() {
    onAuthStateChanged(auth, user => {
      appDataStore.set('user', !!user ? user : null);
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
          <div style={css({ flex: '1', display: 'flex', alignItems: 'stretch' })}>
            {appDataStore.state.status === 'loading' && (
              <span class="loading loading-spinner loading-lg" />
            )}
            {appDataStore.state.status === 'logged_out' && (
              <div style={css({ display: 'flex', justifyContent: 'center', marginTop: '100px' })}>
                <div style={css({ minWidth: '450px' })}>
                  <user-auth-card />
                </div>
              </div>
            )}
            {appDataStore.state.status === 'logged_in_choose_event' && <event-list />}
            {appDataStore.state.status === 'logged_in_capturing' && <capture-cycle />}
          </div>
        </div>
      </Host>
    );
  }
}
