import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'rm-modal-button',
})
export class RmModalButton {
  @Prop() buttonText!: string;
  @Prop() buttonColor?: TDaisyUiColors;
  HTMLDialogElement?: HTMLDialogElement;

  render() {
    return (
      <Host>
        <button
          class={`btn btn-${this.buttonColor ?? 'primary'}`}
          onClick={() => this.HTMLDialogElement?.showModal()}
        >
          {this.buttonText}
        </button>
        <dialog id="my_modal_1" class="modal" ref={el => (this.HTMLDialogElement = el)}>
          <div class="modal-box">
            <form method="dialog">
              <slot></slot>
            </form>
          </div>
        </dialog>
      </Host>
    );
  }
}
