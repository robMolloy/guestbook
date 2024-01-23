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
  @State() userEmailError: string = '';
  @State() userPassword: string = '';
  @State() userPasswordErrorMessage: string = '';

  checkUserEmailValid() {
    this.userEmailError = (() => {
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

  render() {
    return (
      <div data-theme="cupcake" style={css({ border: 'solid 1px red' })}>
        <form>
          <div>
            {this.userEmailError}
            <br />
            <input
              ref={elm => (this.inputElement = elm)}
              type="text"
              placeholder="email"
              class="input input-bordered w-full"
              onInput={e => {
                this.userEmail = (e.target as HTMLInputElement).value;
                this.checkUserEmailValid();
              }}
              value={this.userEmail}
            />
          </div>
          <br />
          <div>
            {this.userPasswordErrorMessage} <br />
            <input
              type="text"
              placeholder="password"
              class={`input input-bordered w-full${
                !this.userPasswordErrorMessage || ' input-error'
              }`}
              onInput={e => {
                this.userPassword = (e.target as HTMLInputElement).value;
                this.checkUserPasswordValid();
              }}
              value={this.userPassword}
            />
          </div>
        </form>
      </div>
    );
  }
}
