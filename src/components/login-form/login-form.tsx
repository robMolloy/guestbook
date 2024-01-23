import { css } from '@/src/utils/cssUtils';
import { Component, State, h } from '@stencil/core';

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
  ],
});

@Component({
  tag: 'login-form',
  styleUrl: '../../styles/daisyUi.css',
  shadow: true,
})
export class LoginForm {
  @State() userEmail: string = '';
  @State() userEmailErrorMessage: string = '';
  @State() userPassword: string = '';
  @State() userPasswordErrorMessage: string = '';

  checkUserEmailValid() {
    this.userEmailErrorMessage = (() => {
      if (this.userEmail.length <= 7) return 'Email must be more than 7 characters long';
      if (!this.userEmail.includes('@')) return 'Email must contain an @ symbol';
      return '';
    })();
  }

  checkUserPasswordValid() {
    this.userPasswordErrorMessage = checkRules({
      rules: ruleMap.password,
      value: this.userPassword,
    });
  }

  @State() inputElement?: HTMLInputElement = undefined;
  @State() mode: 'login' | 'create' = 'login';

  render() {
    return (
      <div data-theme="synthwave" style={css({ border: 'solid 1px red' })}>
        <div style={css({ height: '100vh' })}>
          <span class="card bg-neutral text-neutral-content" style={css({ width: '450px' })}>
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
            <div class="card-body items-center text-center">
              <form>
                <div>
                  <label class="form-control w-full max-w-xs">
                    <div class="label">
                      <span class="label-text">
                        {this.userEmailErrorMessage || 'Type your email'}
                      </span>
                    </div>
                    <input
                      ref={elm => (this.inputElement = elm)}
                      type="text"
                      placeholder="email"
                      class={`input input-bordered input-info w-full${
                        !this.userPasswordErrorMessage || ' input-error'
                      }`}
                      onInput={e => {
                        this.userEmail = (e.target as HTMLInputElement).value;
                        this.checkUserEmailValid();
                      }}
                      value={this.userEmail}
                      style={css({ background: 'white', color: 'black' })}
                    />
                  </label>
                </div>
                <br />
                <div>
                  <label class="form-control">
                    <div class="label">
                      <span class="label-text">
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
                      style={css({ background: 'white', color: 'black' })}
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
                    if (!!this.userEmailErrorMessage || !!this.userPasswordErrorMessage) return;
                    console.log({
                      userEmail: this.userEmail,
                      userPassword: this.userPassword,
                    });
                  }}
                >
                  Submit
                </button>
              </form>
            </div>
          </span>
        </div>
      </div>
    );
  }
}
