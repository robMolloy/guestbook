import {LitElement, html, css} from 'lit';
import {customElement, property as _property} from 'lit/decorators.js';

/**
 * An example element.
 *
 *
 */

@customElement('video-stream')
export class VideoStream extends LitElement {
  static override styles = css`
    :host {
      border: solid 1px gray;
    }
  `;

  override render() {
    return html` <h1>hi!</h1> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'video-stream': VideoStream;
  }
}
