import {
  confirmCreateSelectedImageDataUrlItem,
  createBackupImageDataUrlItem,
} from '@/src/utils/firestoreUtils';
import { delay } from '@/src/utils/timeUtils';
import { Component, Listen, Prop, State, Watch, h } from '@stencil/core';
import { v4 as uuid } from 'uuid';

@Component({
  tag: 'dumb-capture-cycle',
  styleUrl: '../../../styles/daisyUi.css',
  shadow: true,
})
export class CaptureCycle {
  @State() selectedImageDataUrl?: string = undefined;
  @State() isSelectedImageDataUrlSending?: boolean = false;
  @State() status:
    | 'loading'
    | 'ready'
    | 'fail'
    | 'success'
    | 'preReady'
    | 'capturing'
    | 'selecting' = 'loading';

  displayStreamElement?: HTMLCaptureCycleDisplayStreamElement;
  displayPhotoGridElement?: HTMLCaptureCycleDisplayPhotoGridElement;
  displaySelectedPhotoElement?: HTMLCaptureCycleDisplaySelectedPhotoElement;

  @Prop() streamSettings!: {
    videoElementWidth: number;
    videoElementHeight: number;
    mediaWidth: number;
    mediaHeight: number;
    aspectRatio: number;
  };

  @Watch('status')
  watchPropHandler() {
    if (this.status === 'preReady') {
      this.selectedImageDataUrl = undefined;
      // TODO: fix: setTimeout used to delay restart as it recognises the status ready click causing the start cycle
      setTimeout(() => (this.status = 'ready'), 100);
    }
  }

  async componentDidLoad() {
    this.status = 'preReady';
  }

  async sendSelectedImageDataUrl() {
    if (!this.selectedImageDataUrl) return;
    if (this.isSelectedImageDataUrlSending) return;
    this.isSelectedImageDataUrlSending = true;
    const resp = await confirmCreateSelectedImageDataUrlItem({
      imageDataUrl: this.selectedImageDataUrl,
    });
    console.log(resp);

    this.status = 'success';
    this.isSelectedImageDataUrlSending = false;
  }

  @Listen('selectPhoto')
  selectPhoto(event: CustomEvent<string>) {
    if (this.status === 'selecting') this.selectedImageDataUrl = event.detail;
  }

  @Listen('goToCaptureCycleStatusPreReady')
  goToStartGuestbookScreen() {
    this.status = 'preReady';
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
        {(this.status === 'ready' || this.status === 'capturing') && !!this.streamSettings && (
          <capture-cycle-display-stream
            ref={elm => (this.displayStreamElement = elm)}
            streamSettings={this.streamSettings}
          />
        )}

        {this.status === 'selecting' && (
          <capture-cycle-display-selected-photo
            selectedImageDataUrl={this.selectedImageDataUrl}
            ref={elm => (this.displaySelectedPhotoElement = elm)}
          />
        )}

        {this.status === 'selecting' && (
          <button-container>
            <button
              class="btn btn-primary"
              disabled={
                this.selectedImageDataUrl === undefined || this.isSelectedImageDataUrlSending
              }
              onClick={async () => {
                if (!this.isSelectedImageDataUrlSending) this.sendSelectedImageDataUrl();
              }}
            >
              Choose photo
            </button>
            <button class="btn btn-accent" onClick={() => (this.status = 'preReady')}>
              Start again
            </button>
          </button-container>
        )}

        {(this.status === 'capturing' || this.status === 'selecting') && (
          <div style={{ flex: '1' }}>
            <capture-cycle-display-photo-grid ref={elm => (this.displayPhotoGridElement = elm)} />
          </div>
        )}

        {this.status === 'success' && <capture-cycle-confirm-photo-success-screen />}
        {this.status === 'fail' && <capture-cycle-confirm-photo-fail-screen />}
      </div>
    );
  }
}
