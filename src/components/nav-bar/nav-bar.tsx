import appDataStore from '@/src/stores/appDataStore';
import { css } from '@/src/utils/cssUtils';
import { logoutFirebaseUser } from '@/src/utils/firebaseAuthUtils';
import { Component, Host, State, Watch, h } from '@stencil/core';

@Component({
  tag: 'nav-bar',
})
export class NavBar {
  @State() status: 'show' | 'hide' | 'inform' = 'show';
  @State() clickHoldTimer?: NodeJS.Timeout;
  @Watch('status') watchPropHandler() {
    if (this.status === 'inform') {
      setTimeout(() => {
        if (this.status === 'inform') this.status = 'hide';
      }, 5000);
    }
  }

  render() {
    return (
      <Host>
        {this.status === 'show' && (
          <div class="navbar bg-primary text-primary-content" data-theme={appDataStore.state.theme}>
            <div style={css({ flex: '1' })}>
              <a class="btn btn-ghost text-xl">open guestbook</a>
            </div>
            <div>
              <button-container paddingY={0}>
                {appDataStore.state.status === 'capturing_event' && (
                  <rm-button
                    color="neutral"
                    onClick={() => (appDataStore.state.eventMode = 'managing')}
                  >
                    view event
                  </rm-button>
                )}
                {appDataStore.state.status === 'capturing_event' && (
                  <rm-button color="neutral" onClick={() => (this.status = 'inform')}>
                    hide nav
                  </rm-button>
                )}
                {appDataStore.state.status === 'managing_event' && (
                  <rm-button
                    color="neutral"
                    onClick={() => (appDataStore.state.currentEvent = undefined)}
                  >
                    view all events
                  </rm-button>
                )}
              </button-container>
            </div>
            <div style={css({ display: 'flex', flex: '1' })}>
              <div style={css({ flex: '1' })}></div>
              <ul class="menu menu-horizontal px-1">
                {appDataStore.state.isLoggedIn && (
                  <li onClick={() => logoutFirebaseUser()}>
                    <a>logout</a>
                  </li>
                )}
                <li>
                  <details>
                    <summary>Theme</summary>
                    <ul
                      class="p-2 bg-secondary text-secondary-content rounded-t-none"
                      style={css({
                        overflowY: 'auto',
                        maxHeight: '40vh',
                        zIndex: '99',
                        transform: 'translateX(-20px)',
                      })}
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
          </div>
        )}
        {this.status === 'inform' && (
          <div data-theme={appDataStore.state.theme}>
            <custom-h2>click and hold here for 3 seconds to show nav bar</custom-h2>
          </div>
        )}
        {this.status === 'hide' && (
          <div
            data-theme={appDataStore.state.theme}
            onMouseDown={() => {
              this.clickHoldTimer = setTimeout(() => {
                // Check if the element is still being held down after 3 seconds
                this.status = 'show';
              }, 3000);
            }}
            onMouseUp={() => {
              clearTimeout(this.clickHoldTimer);
            }}
          >
            <br />
          </div>
        )}
      </Host>
    );
  }
}
