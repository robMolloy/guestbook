import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'rm-accordian',
})
export class RmAccordian {
  @Prop() heading!: string;
  @Prop() color?: TDaisyUiColors;

  render() {
    return (
      <div class={`collapse bg-${this.color ?? 'primary'} text-${this.color ?? 'primary'}-content`}>
        <input type="checkbox" />
        <div class="collapse-title text-xl font-medium">{this.heading}</div>
        <div class="collapse-content">
          <slot></slot>
        </div>
      </div>
    );
  }
}
