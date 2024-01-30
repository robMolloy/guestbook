import { Component, Event, EventEmitter, State, h } from '@stencil/core';
import { createFirebaseUser } from '@/src/utils/firebaseAuthUtils';
import { css } from '@/src/utils/cssUtils';

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
  tag: 'user-create-form',
  styleUrl: '../../styles/daisyUi.css',
  shadow: true,
})
export class LoginForm {
  @State() userEmail: string = '';
  @State() userEmailErrorMessage: string = '';
  @State() userPassword: string = '';
  @State() userPasswordErrorMessage: string = '';
  @State() userPasswordConfirm: string = '';
  @State() userPasswordConfirmErrorMessage: string = '';
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
  checkUserPasswordConfirmValid() {
    this.userPasswordConfirmErrorMessage = (() => {
      if (this.userPassword === this.userPasswordConfirm) return '';
      return 'password confirmation does not match password';
    })();
  }

  @State() mode: 'login' | 'create' = 'login';
  @State() loading = false;
  @Event({ eventName: 'createUserSuccess' }) createUserSuccess?: EventEmitter;
  @Event({ eventName: 'createUserFail' }) createUserFail?: EventEmitter;

  async onSubmit() {
    if (!!this.loading) return;
    this.checkUserEmailValid();
    this.checkUserPasswordValid();
    this.checkUserPasswordConfirmValid();

    if (
      !!this.userEmailErrorMessage ||
      !!this.userPasswordErrorMessage ||
      !!this.userPasswordConfirmErrorMessage
    )
      return;
    this.loading = true;

    const createResponse = await createFirebaseUser({
      userEmail: this.userEmail,
      userPassword: this.userPassword,
    });

    if (createResponse.success) {
      this.createUserSuccess?.emit();
    } else {
      this.createUserFail?.emit();
      if (createResponse.error.message) this.formErrorMessage = createResponse.error.message;
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
        <div>
          <label class="form-control">
            <div class="label">
              <span class={`label-text${this.userPasswordConfirmErrorMessage ? ' bg-error' : ''}`}>
                {this.userPasswordConfirmErrorMessage || 'Confirm your password'}
              </span>
            </div>
            <input
              type="password"
              placeholder="confirm password"
              class={`input input-bordered input-info w-full${
                !this.userPasswordConfirmErrorMessage || ' input-error'
              }`}
              onInput={e => {
                this.userPasswordConfirm = (e.target as HTMLInputElement).value;
                this.checkUserPasswordConfirmValid();
              }}
              value={this.userPasswordConfirm}
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
