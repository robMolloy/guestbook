import { css } from '@/src/utils/cssUtils';
import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'user-auth-screen',
  styleUrl: '../../../styles/daisyUi.css',
  shadow: true,
})
export class UserAuthScreen {
  render() {
    return (
      <Host
        style={css({
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px',
        })}
      >
        <div style={css({ minWidth: '450px' })}>
          <user-auth-card />
        </div>
      </Host>
    );
  }
}
