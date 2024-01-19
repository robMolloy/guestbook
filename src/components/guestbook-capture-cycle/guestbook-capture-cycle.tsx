import { Component, h, Listen, Prop, State, Watch } from '@stencil/core';
import {
  createBackupImageDataUrlItem,
  createSelectedImageDataUrlItem,
} from '../../utils/firestoreUtils';
import { v4 as uuid } from 'uuid';
import { delay } from '../../utils/timeUtils';

@Component({
  tag: 'guestbook-capture-cycle',
  shadow: true,
})
export class GuestbookCaptureCycle {
  @State() status: 'loading' | 'error' | 'success' | 'ready' | 'capturing' | 'selecting' =
    'loading';
  @State() selectedImageDataUrl?: string = undefined;
  @Prop() mediaDimensions?: {
    videoElementWidth: number;
    videoElementHeight: number;
    mediaWidth: number;
    mediaHeight: number;
    aspectRatio: number;
    imageDataUrlLength: number;
  };

  displayStreamElement?: HTMLDisplayStreamElement;
  displayPhotoGridElement?: HTMLDisplayPhotoGridElement;
  displaySelectedPhoto?: HTMLDisplaySelectedPhotoElement;

  @Listen('selectPhoto')
  selectPhoto(event: CustomEvent<string>) {
    if (this.status === 'selecting') this.selectedImageDataUrl = event.detail;
  }

  async confirmSelectedImageDataUrlItem() {
    console.log(`guestbook-capture-cycle.tsx:${/*LL*/ 38}`, { x: this.selectedImageDataUrl });
    if (!this.selectedImageDataUrl) return;
    const x = await createSelectedImageDataUrlItem({ imageDataUrl: this.selectedImageDataUrl });
    console.log(`guestbook-capture-cycle.tsx:${/*LL*/ 38}`, { x });
    this.status = 'success';
  }

  @Watch('status')
  watchPropHandler() {
    if (this.status === 'ready') this.selectedImageDataUrl = undefined;
  }

  async startCaptureCycle() {
    this.status = 'capturing';

    if (!this.displayStreamElement) return;
    await this.displayStreamElement?.countdown({ start: 3, stop: 0, clear: true });

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
        data-theme="cupcake"
        style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
        onClick={() => {
          if (this.status === 'ready') this.startCaptureCycle();
        }}
      >
        <br />

        {(this.status === 'ready' || this.status === 'capturing') && !!this.mediaDimensions && (
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
          </div>
        )}

        {this.status === 'selecting' && (
          <display-selected-photo
            selectedImageDataUrl={this.selectedImageDataUrl}
            ref={elm => (this.displaySelectedPhoto = elm)}
          />
        )}
        {this.status === 'selecting' && (
          <button-container>
            <button
              class="btn btn-primary"
              disabled={this.selectedImageDataUrl === undefined}
              onClick={async () => {
                this.confirmSelectedImageDataUrlItem();
              }}
            >
              Confirm photo
            </button>
            <button class="btn btn-accent" onClick={() => {}}>
              Start again
            </button>
          </button-container>
        )}
        {(this.status === 'capturing' || this.status === 'selecting') && (
          <div style={{ flex: '1' }}>
            <display-photo-grid ref={elm => (this.displayPhotoGridElement = elm)} />
          </div>
        )}
        {this.status === 'success' && <div>success</div>}
        {this.status === 'error' && <div>error</div>}
        <br />
      </div>
    );
  }
}
