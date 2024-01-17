import { Component, Element, h, Listen, State } from '@stencil/core';
import { createImageDataUrlItem } from '../../utils/firestore';

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
    imageDataUrlLength: number;
  };
  @Element() rootElement?: HTMLElement;
  displayStreamElement?: HTMLDisplayStreamElement;
  displayPhotoGridElement?: HTMLDisplayPhotoGridElement;

  @Listen('initSettingsComplete') handleInitSettingsComplete(
    event: CustomEvent<{
      videoElementWidth: number;
      videoElementHeight: number;
      mediaWidth: number;
      mediaHeight: number;
      aspectRatio: number;
      imageDataUrlLength: number;
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

  async startCaptureCycle() {
    const displayStreamElement = this.rootElement?.shadowRoot?.querySelector('display-stream');
    const displayPhotoGridElement =
      this.rootElement?.shadowRoot?.querySelector('display-photo-grid');
    if (!displayStreamElement || !displayPhotoGridElement) return;
    await displayStreamElement?.countdown({ start: 1, stop: 0, clear: true });

    for (const _ of [0, 1, 2, 3]) {
      const imageDataUrl = await displayStreamElement?.capture();
      if (!imageDataUrl) return;

      await displayPhotoGridElement?.addImageDataUrls(imageDataUrl);
      createImageDataUrlItem({ imageDataUrl });

      await delay(2000);
    }
  }

  render() {
    return (
      <div onClick={() => this.startCaptureCycle()}>
        {this.status}
        {this.status === 'loading' && (
          <init-guestbook-media-settings idealWidth={1080} aspectRatio={6 / 4} />
        )}
        {this.status === 'ready' && !!this.mediaDimensions && (
          <div>
            <display-stream
              mediaDimensions={{
                mediaHeight: this.mediaDimensions.mediaHeight / 1.4,
                mediaWidth: this.mediaDimensions.mediaWidth / 1.4,
                videoElementHeight: this.mediaDimensions.videoElementHeight / 1.4,
                aspectRatio: this.mediaDimensions.aspectRatio,
                videoElementWidth: this.mediaDimensions.videoElementWidth / 1.4,
              }}
              ref={elm => (this.displayStreamElement = elm)}
            />
            <div
              style={{
                height: '50vh',
                display: 'flex',
                flexDirection: 'column',
                border: 'solid 1px red',
              }}
            >
              <div
                style={{ display: 'flex', justifyContent: 'center', padding: '20px', gap: '20px' }}
              >
                <button>click me</button>
                <button>click me2</button>
              </div>
              <div style={{ flex: '1' }}>
                <display-photo-grid
                  ref={elm => (this.displayPhotoGridElement = elm)}
                  style={{ display: 'none' }}
                ></display-photo-grid>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
