import { css } from '@/src/utils/cssUtils';
import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'user-auth-card',
  styleUrl: '../../styles/daisyUi.css',
  shadow: true,
})
export class UserAuthCard {
  @State() inputElement?: HTMLInputElement = undefined;
  @State() mode: 'login' | 'create' = 'login';

  render() {
    return (
      <div
        class="card box"
        style={css({ boxShadow: '7px 7px 13px rgba(0, 0, 0, 0.5)' })}
        data-theme="synthwave"
      >
        <span role="tablist" class="tabs tabs-bordered">
          <a
            role="tab"
            class={`tab ${this.mode === 'login' ? 'tab-active' : ''}`}
            onClick={() => (this.mode = 'login')}
          >
            Login
          </a>
          <a
            role="tab"
            class={`tab ${this.mode === 'create' ? 'tab-active' : ''}`}
            onClick={() => (this.mode = 'create')}
          >
            Create
          </a>
        </span>
        <div class="card-body items-center text-center" style={css({ minHeight: '320px' })}>
          {this.mode === 'login' && (
            <user-login-form
              onLoginSuccess={() => {
                console.log('login success');
              }}
              onLoginFail={() => {
                console.log('login fail');
              }}
            />
          )}
          {this.mode === 'create' && (
            <user-create-form
              onCreateUserSuccess={() => {
                console.log('user created success');
              }}
              onCreateUserFail={() => {
                console.log('user created failed');
              }}
            />
          )}
        </div>
      </div>
    );
  }
}
