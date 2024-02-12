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
          <div style={css({ flex: '1', display: 'flex' })}>
            {appDataStore.state.status === 'loading' && <loading-screen />}
            {appDataStore.state.status === 'logged_out' && (
              <user-auth-screen style={css({ minWidth: '100%' })} />
            )}
            {appDataStore.state.status === 'logged_in_choose_event' && (
              <events-screen style={css({ minWidth: '100%' })} />
            )}
            {appDataStore.state.status === 'logged_in_capturing' && <capture-cycle />}
          </div>
        </div>
      </Host>
    );
  }
}
