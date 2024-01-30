import { auth } from '@/src/config/firebase-config';
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
    });
  }
  render() {
    return (
      <Host>
        {this.isLoggedIn === undefined && (
          <div>
            <span class="loading loading-spinner loading-lg"></span>
          </div>
        )}
        {this.isLoggedIn === false && (
          <div style={css({ display: 'flex', justifyContent: 'center', marginTop: '100px' })}>
            <div style={css({ minWidth: '450px' })}>
              {/* <capture-cycle /> */}
              <user-auth-card />
              {/* <smart-guestbook-capture-cycle></smart-guestbook-capture-cycle> */}
            </div>
          </div>
        )}
        {this.isLoggedIn === true && <event-list />}
      </Host>
    );
  }
}
