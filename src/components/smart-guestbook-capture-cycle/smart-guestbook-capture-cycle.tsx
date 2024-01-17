import { Component, Element, h, Listen, State } from '@stencil/core';

const delay = async (x: number) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(true), x);
  });
};
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
    const displayPhotoGrid = this.rootElement?.shadowRoot?.querySelector('display-photo-grid');
    if (!elm) return;
    await elm?.countdown({ start: 3, stop: 0, clear: true });

    const resp2 = await elm?.capture();
    if (resp2) await displayPhotoGrid?.addImageDataUrls(resp2);
    await delay(2000);
    console.log(`smart-guestbook-capture-cycle.tsx:${/*LL*/ 39}`, { resp2, resp2Length: resp2?.length });
  }

  render() {
    return (
      <div onClick={() => this.handleTestClick()}>
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
            <div style={{ height: '50vh', display: 'flex', flexDirection: 'column', border: 'solid 1px red' }}>
              <div style={{ display: 'flex', justifyContent: 'center', padding: '20px', gap: '20px' }}>
                <button>click me</button>
                <button>click me2</button>
              </div>
              <div style={{ flex: '1' }}>
                <display-photo-grid></display-photo-grid>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
