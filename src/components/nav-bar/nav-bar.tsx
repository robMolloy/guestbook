import appDataStore from '@/src/stores/appDataStore';
import { css } from '@/src/utils/cssUtils';
import { logoutFirebaseUser } from '@/src/utils/firebaseAuthUtils';
import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'nav-bar',
  styleUrl: '../../styles/daisyUi.css',
  shadow: true,
})
export class NavBar {
  render() {
    return (
      <Host>
        <div class="navbar bg-primary" data-theme={appDataStore.state.theme}>
          <div style={css({ flex: '1' })}>
            <a class="btn btn-ghost text-xl">open guestbook</a>
          </div>
          <div class="flex-none">
            <ul class="menu menu-horizontal px-1">
              <li onClick={() => logoutFirebaseUser()}>
                <a>logout</a>
              </li>
              <li>
                <details>
                  <summary>Theme</summary>
                  <ul
                    class="p-2 bg-secondary rounded-t-none"
                    style={css({ overflow: 'scroll', maxHeight: '40vh', zIndex: '99' })}
                  >
                    {appDataStore.state.availableThemes.map(x => (
                      <li onClick={() => (appDataStore.state.theme = x)}>
                        <a>{x}</a>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            </ul>
          </div>
          <div style={css({ minWidth: '40px' })}></div>
        </div>
      </Host>
    );
  }
}
