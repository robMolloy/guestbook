import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'rm-button',
})
export class RmButton {
  @Prop() color?: 'primary';
  render() {
    return (
      <button class={`btn btn-${this.color ?? 'primary'}`}>
        <slot></slot>
      </button>
    );
  }
}
