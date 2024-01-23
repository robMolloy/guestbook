import {
  confirmCreateSelectedImageDataUrlItem,
  createBackupImageDataUrlItem,
} from '@/src/utils/firestoreUtils';
import { delay } from '@/src/utils/timeUtils';
import { Component, Prop, State, Watch, h } from '@stencil/core';
import { v4 as uuid } from 'uuid';

@Component({
  tag: 'dumb-capture-cycle',
  styleUrl: '../../../styles/daisyUi.css',
  shadow: true,
})
export class CaptureCycle {
  @State() selectedImageDataUrl?: string = undefined;
  @State() status:
    | 'loading'
    | 'preReady'
    | 'ready'
    | 'capturing'
    | 'selecting'
    | 'sending'
    | 'fail'
    | 'success' = 'loading';

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
    this.status = 'sending';
    if (!this.selectedImageDataUrl) return;

    const resp = await confirmCreateSelectedImageDataUrlItem({
      id: uuid(),
      imageDataUrl: this.selectedImageDataUrl,
    });

    this.status = resp.success ? 'success' : 'fail';
  }

  async runCaptureCycle() {
    this.status = 'capturing';

    if (!this.displayStreamElement) return;
    await this.displayStreamElement.countdown({ start: 3, stop: 0, clear: true });

    const groupId = uuid();

    for (const _ of [0, 1, 2, 3]) {
      const imageDataUrl = await this.displayStreamElement.capture();
      if (!imageDataUrl || !this.displayPhotoGridElement) return;

      await this.displayPhotoGridElement.addImageDataUrls(imageDataUrl);
      createBackupImageDataUrlItem({ id: uuid(), imageDataUrl, groupId });

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
          if (this.status === 'ready') this.runCaptureCycle();
        }}
      >
        <br />

        {this.status === 'ready' && <custom-h1>Click anywhere to start</custom-h1>}
        {this.status === 'capturing' && <custom-h1>Strike a pose!</custom-h1>}
        {this.status === 'selecting' && <custom-h1>Select your favourite photo</custom-h1>}
        {this.status === 'sending' && <custom-h1>Sending...</custom-h1>}

        {(this.status === 'ready' || this.status === 'capturing') && !!this.streamSettings && (
          <capture-cycle-display-stream
            ref={elm => (this.displayStreamElement = elm)}
            streamSettings={this.streamSettings}
          />
        )}

        {(this.status === 'selecting' || this.status === 'sending') && (
          <capture-cycle-display-selected-photo
            selectedImageDataUrl={this.selectedImageDataUrl}
            ref={elm => (this.displaySelectedPhotoElement = elm)}
          />
        )}

        {(this.status === 'selecting' || this.status === 'sending') && (
          <button-container>
            <button
              class="btn btn-primary"
              disabled={this.selectedImageDataUrl === undefined || this.status === 'sending'}
              onClick={async () => {
                if (this.status !== 'sending') this.sendSelectedImageDataUrl();
              }}
            >
              Choose photo
            </button>
            <button class="btn btn-accent" onClick={() => (this.status = 'preReady')}>
              Start again
            </button>
          </button-container>
        )}

        {(this.status === 'capturing' ||
          this.status === 'selecting' ||
          this.status === 'sending') && (
          <div style={{ flex: '1' }}>
            <capture-cycle-display-photo-grid
              ref={elm => (this.displayPhotoGridElement = elm)}
              onSelectPhoto={e => {
                if (this.status === 'selecting') this.selectedImageDataUrl = e.detail;
              }}
            />
          </div>
        )}

        {this.status === 'success' && (
          <capture-cycle-confirm-photo-success-screen
            onStartAgainClick={() => {
              this.status = 'preReady';
            }}
          />
        )}
        {this.status === 'fail' && (
          <capture-cycle-confirm-photo-fail-screen
            onStartAgainClick={() => {
              this.status = 'preReady';
            }}
          />
        )}
      </div>
    );
  }
}
