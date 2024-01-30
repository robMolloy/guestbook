import { logoutFirebaseUser } from '@/src/utils/firebaseAuthUtils';
import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'event-list',
  styleUrl: '../../styles/daisyUi.css',
  shadow: true,
})
export class EventList {
  render() {
    return (
      <Host data-theme="synthwave">
        <div>
          <button onClick={() => logoutFirebaseUser()} class="btn btn-primary">
            Log out
          </button>
        </div>
      </Host>
    );
  }
}
