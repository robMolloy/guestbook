import { Component, h, Listen, State, Watch } from '@stencil/core';
import { createBackupImageDataUrlItem } from '../../utils/firestoreUtils';
import { v4 as uuid } from 'uuid';
import { delay } from '../../utils/timeUtils';

@Component({
  tag: 'smart-guestbook-capture-cycle',
  styleUrls: ['../../styles/daisyUi.css'],
  shadow: true,
})
export class SmartGuestbookCaptureCycle {
  @State() status:
    | 'loading'
    | 'initError'
    | 'error'
    | 'success'
    | 'preReady'
    | 'ready'
    | 'capturing'
    | 'selecting' = 'loading';
  @State() selectedImageDataUrl?: string = undefined;
  @State() mediaDimensions?: {
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
    this.status = 'preReady';
  }
  @Listen('initSettingsError')
  handleClick(event: any) {
    console.log('initSettingsComplete', event);
  }
  @Listen('selectPhoto')
  selectPhoto(event: CustomEvent<string>) {
    if (this.status === 'selecting') this.selectedImageDataUrl = event.detail;
  }

  @Watch('status')
  watchPropHandler() {
    if (this.status === 'preReady') {
      this.selectedImageDataUrl = undefined;
      // TODO: fix: setTimeout used to delay restart as it recognises the status ready click causing the start cycle
      setTimeout(() => (this.status = 'ready'), 100);
    }
  }

  async confirmPhoto() {
    console.log(123);
    this.status = 'success';
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
        <div>{this.status}</div>

        {(this.status === 'ready' || this.status === 'capturing') && !!this.mediaDimensions && (
          <div>
            <display-stream
              ref={elm => (this.displayStreamElement = elm)}
              mediaDimensions={{
                mediaHeight: this.mediaDimensions.mediaHeight / 1.4,
                mediaWidth: this.mediaDimensions.mediaWidth / 1.4,
                videoElementHeight: this.mediaDimensions.videoElementHeight / 1.4,
                aspectRatio: this.mediaDimensions.aspectRatio,
                videoElementWidth: this.mediaDimensions.videoElementWidth / 1.4,
              }}
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
                this.confirmPhoto();
              }}
            >
              Choose photo
            </button>
            <button
              class="btn btn-accent"
              onClick={() => {
                this.status = 'preReady';
              }}
            >
              Start again
            </button>
          </button-container>
        )}
        {(this.status === 'capturing' || this.status === 'selecting') && (
          <div style={{ flex: '1' }}>
            <display-photo-grid ref={elm => (this.displayPhotoGridElement = elm)} />
          </div>
        )}

        {this.status === 'success' && (
          <div
            style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div>success</div>
          </div>
        )}
        {this.status === 'error' && (
          <div
            style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div>error</div>
          </div>
        )}
        <br />
      </div>
    );
  }
}
