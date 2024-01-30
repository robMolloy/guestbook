import { css } from '@/src/utils/cssUtils';
import { loginFirebaseUser } from '@/src/utils/firebaseAuthUtils';
import { Component, Event, EventEmitter, State, h } from '@stencil/core';

type TRule = ({ validRegex: RegExp } | { invalidRegex: RegExp }) & { message: string };
type TRules = TRule[];

const createRuleMap = <T extends { [k: string]: TRules }>(p: T) => {
  return p;
};

const checkRules = (p: { rules: TRules; value: string }) => {
  const userPasswordError = p.rules.find(x => {
    if ('validRegex' in x) return !x.validRegex.test(p.value);
    return x.invalidRegex.test(p.value);
  });
  return userPasswordError?.message ?? '';
};

const ruleMap = createRuleMap({
  password: [
    {
      validRegex: /[!@#$%^&*(),.?":{}|<>]/,
      message: 'string must contain a special character',
    },
    {
      validRegex: /^.{7,}$/,
      message: 'string must be longer than 8 characters',
    },
  ],
  email: [
    {
      validRegex: /[!@#$%^&*(),.?":{}|<>]/,
      message: 'string must contain a special character',
    },
    {
      validRegex: /^.{7,}$/,
      message: 'string must be longer than 8 characters',
    },
    {
      validRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: 'this does not appear to be an email',
    },
  ],
});

@Component({
  tag: 'user-login-form',
  styleUrl: '../../styles/daisyUi.css',
  shadow: true,
})
export class LoginForm {
  @State() userEmail = '';
  @State() userEmailErrorMessage = '';
  @State() userPassword = '';
  @State() userPasswordErrorMessage = '';
  @State() formErrorMessage = '';

  checkUserEmailValid() {
    this.userEmailErrorMessage = checkRules({
      rules: ruleMap.email,
      value: this.userEmail,
    });
  }

  checkUserPasswordValid() {
    this.userPasswordErrorMessage = checkRules({
      rules: ruleMap.password,
      value: this.userPassword,
    });
  }

  @State() mode: 'login' | 'create' = 'login';
  @State() loading = false;
  @Event({ eventName: 'loginSuccess' }) loginSuccessEvent?: EventEmitter;
  @Event({ eventName: 'loginFail' }) loginFail?: EventEmitter;

  async onSubmit() {
    if (!!this.loading) return;
    this.checkUserEmailValid();
    this.checkUserPasswordValid();
    if (!!this.userEmailErrorMessage || !!this.userPasswordErrorMessage) return;
    this.loading = true;

    const loginResponse = await loginFirebaseUser({
      userEmail: this.userEmail,
      userPassword: this.userPassword,
    });
    if (loginResponse.success) {
      this.loginSuccessEvent?.emit();
    } else {
      this.loginFail?.emit();
      if (loginResponse.error.message) this.formErrorMessage = loginResponse.error.message;
    }
    this.loading = false;
  }

  render() {
    return (
      <form>
        <div>
          {this.formErrorMessage && (
            <div style={css({ textAlign: 'center' })} class="bg-error">
              {this.formErrorMessage}
            </div>
          )}
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class={`label-text${this.userEmailErrorMessage ? ' bg-error' : ''}`}>
                {this.userEmailErrorMessage || 'Type your email'}
              </span>
            </div>
            <input
              type="text"
              placeholder="email"
              class={`input input-bordered input-info w-full${
                !this.userEmailErrorMessage || ' input-error'
              }`}
              onInput={e => {
                this.userEmail = (e.target as HTMLInputElement).value;
                this.checkUserEmailValid();
              }}
              value={this.userEmail}
            />
          </label>
        </div>
        <br />
        <div>
          <label class="form-control">
            <div class="label">
              <span class={`label-text${this.userPasswordErrorMessage ? ' bg-error' : ''}`}>
                {this.userPasswordErrorMessage || 'Type your password'}
              </span>
            </div>
            <input
              type="password"
              placeholder="password"
              class={`input input-bordered input-info w-full${
                !this.userPasswordErrorMessage || ' input-error'
              }`}
              onInput={e => {
                this.userPassword = (e.target as HTMLInputElement).value;
                this.checkUserPasswordValid();
              }}
              value={this.userPassword}
            />
          </label>
        </div>
        <br />
        <br />
        <button
          type="submit"
          class="btn btn-primary"
          onClick={e => {
            e.preventDefault();
            this.onSubmit();
          }}
        >
          Submit
          {!!this.loading && <span class="loading loading-spinner loading-md"></span>}
        </button>
      </form>
    );
  }
}
