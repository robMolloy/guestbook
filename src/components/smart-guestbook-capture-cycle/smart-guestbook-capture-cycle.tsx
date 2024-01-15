import { Component, Element, h, Listen, State } from '@stencil/core';

@Component({
  tag: 'smart-guestbook-capture-cycle',
  shadow: true,
})
export class SmartGuestbookCaptureCycle {
  @State() status: 'loading' | 'error' | 'ready' = 'loading';
  @State() mediaDimensions?: {
    videoElementWidth: number;
    videoElementHeight: number;
    mediaWidth: number;
    mediaHeight: number;
    aspectRatio: number;
  };
  @Element() rootElement?: HTMLElement;

  @Listen('initSettingsComplete') handleInitSettingsComplete(
    event: CustomEvent<{
      videoElementWidth: number;
      videoElementHeight: number;
      mediaWidth: number;
      mediaHeight: number;
      aspectRatio: number;
    }>,
  ) {
    console.log('initSettingsComplete', event.detail);
    this.mediaDimensions = { ...event.detail };
    this.status = 'ready';
  }
  @State() countdownInt?: number = undefined;
  @Listen('initSettingsError')
  handleClick(event: any) {
    console.log('initSettingsComplete', event);
  }

  async handleTestClick() {
    const elm = this.rootElement?.shadowRoot?.querySelector('guestbook-capture-cycle');
    if (!elm) return;
    await elm?.countdown(3, 0);
    await elm.clearCountdown();
    const resp2 = await elm?.capture();
    console.log(`smart-guestbook-capture-cycle.tsx:${/*LL*/ 39}`, { resp2, resp2Length: resp2?.length });
  }

  render() {
    return (
      <div>
        <button onClick={() => this.handleTestClick()}>handleTestClick()</button>

        {this.status}
        {this.status === 'loading' && <init-guestbook-media-settings idealWidth={1080} aspectRatio={6 / 4} />}
        {this.status === 'ready' && !!this.mediaDimensions && (
          <div>
            <guestbook-capture-cycle
              mediaDimensions={{
                mediaHeight: this.mediaDimensions.mediaHeight / 1.4,
                mediaWidth: this.mediaDimensions.mediaWidth / 1.4,
                videoElementHeight: this.mediaDimensions.videoElementHeight / 1.4,
                videoElementWidth: this.mediaDimensions.videoElementWidth / 1.4,
                aspectRatio: this.mediaDimensions.aspectRatio,
              }}
            />
          </div>
        )}
      </div>
    );
  }
}
