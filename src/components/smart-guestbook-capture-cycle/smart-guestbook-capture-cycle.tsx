import { Component, Element, h, Listen, State } from '@stencil/core';
import { createBackupImageDataUrlItem as createBackupImageDataUrlItem } from '../../utils/firestore';
import { v4 as uuid } from 'uuid';

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
  @State() status: 'loading' | 'error' | 'ready' | 'capturing' | 'selecting' = 'loading';
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
  @Listen('initSettingsError')
  handleClick(event: any) {
    console.log('initSettingsComplete', event);
  }
  @Listen('selectPhoto')
  selectPhoto(event: CustomEvent<string>) {
    console.log('selectPhoto', event.detail);
  }

  async startCaptureCycle() {
    this.status = 'capturing';

    if (!this.displayStreamElement) return;
    await this.displayStreamElement?.countdown({ start: 1, stop: 0, clear: true });

    const groupId = uuid();

    for (const _ of [0, 1, 2, 3]) {
      const imageDataUrl = await this.displayStreamElement?.capture();
      if (!imageDataUrl || !this.displayPhotoGridElement) return;

      await this.displayPhotoGridElement.addImageDataUrls(imageDataUrl);
      createBackupImageDataUrlItem({ imageDataUrl, groupId });

      await delay(2000);
    }
    this.status = 'selecting';
  }

  render() {
    if (this.status === 'loading')
      return <init-stream-settings idealWidth={1080} aspectRatio={6 / 4} />;

    return (
      <div
        onClick={() => {
          if (this.status === 'ready') this.startCaptureCycle();
        }}
      >
        {(this.status === 'ready' || this.status === 'capturing') && !!this.mediaDimensions && (
          <half-screen-section>
            {this.status}
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
            <button-container>
              <button>click me</button>
              <button>click me2</button>
            </button-container>
          </half-screen-section>
        )}
        {this.status === 'selecting' && <half-screen-section>asd</half-screen-section>}
        {(this.status === 'capturing' || this.status === 'selecting') && (
          <half-screen-section>
            <display-photo-grid
              ref={elm => (this.displayPhotoGridElement = elm)}
            ></display-photo-grid>
          </half-screen-section>
        )}
      </div>
    );
  }
}
