import appDataStore from '@/src/stores/appDataStore';
import { css } from '@/src/utils/cssUtils';
import { uploadSelectedImageAndConfirm, uploadBackupImage } from '@/src/utils/firestoreUtils';
import { delay } from '@/src/utils/timeUtils';
import { Component, Host, Prop, State, Watch, h } from '@stencil/core';
import { v4 as uuid } from 'uuid';

type TStatus = CaptureCycle['status'];
const i18n = {
  captureCycle: {
    heading: {
      ready: 'Click anywhere to start',
      capturing: 'Strike a pose!',
      selecting: 'Select your favourite photo',
      sending: 'Sending...',
    } as { [key in TStatus]?: string },
  },
};

@Component({
  tag: 'dumb-capture-cycle',
  styleUrl: '../../../styles/daisyUi.css',
  shadow: true,
})
export class CaptureCycle {
  @State() selectedImageDataUrl?: string = undefined;
  @State() groupId?: string;
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

  @Watch('status') watchPropHandler() {
    if (this.status === 'preReady') {
      this.selectedImageDataUrl = undefined;
      this.groupId = uuid();
      // TODO: fix: setTimeout used to delay restart as it recognises the status ready click causing the start cycle
      setTimeout(() => (this.status = 'ready'), 100);
    }
  }

  async componentWillLoad() {
    this.status = 'preReady';
  }

  async sendSelectedImageDataUrl() {
    this.status = 'sending';
    if (!this.selectedImageDataUrl) return;

    const resp =
      !!appDataStore.state.currentEventId && !!appDataStore.state.user?.uid && !!this.groupId
        ? await uploadSelectedImageAndConfirm({
            id: uuid(),
            groupId: this.groupId,
            eventId: appDataStore.state.currentEventId,
            userId: appDataStore.state.user.uid,
            imageDataUrl: this.selectedImageDataUrl,
          })
        : ({ success: false } as const);

    this.status = resp.success ? 'success' : 'fail';
  }

  async runCaptureCycleIfStatusReady() {
    if (this.status !== 'ready') return;
    this.status = 'capturing';

    if (!this.displayStreamElement) return;
    await this.displayStreamElement.countdown({ start: 3, stop: 0, clear: true });

    for (const _ of [0, 1, 2, 3]) {
      const imageDataUrl = await this.displayStreamElement.capture();
      if (!imageDataUrl || !this.displayPhotoGridElement) return;

      await this.displayPhotoGridElement.addImageDataUrls(imageDataUrl);

      if (this.groupId && appDataStore.state.currentEventId && appDataStore.state.user?.uid)
        uploadBackupImage({
          id: uuid(),
          eventId: appDataStore.state.currentEventId,
          userId: appDataStore.state.user.uid,
          imageDataUrl,
          groupId: this.groupId,
        });

      await delay(2000);
    }
    this.status = 'selecting';
  }

  render() {
    return (
      <Host data-theme={appDataStore.state.theme} style={css({ flex: '1', display: 'flex' })}>
        <div
          style={css({
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          })}
          onClick={() => this.runCaptureCycleIfStatusReady()}
        >
          {i18n.captureCycle.heading[this.status] && (
            <custom-h1>{i18n.captureCycle.heading[this.status]}</custom-h1>
          )}

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
          {this.status === 'sending' && (
            <button-container>
              <span class="loading loading-spinner loading-lg"></span>
            </button-container>
          )}
          {(this.status === 'selecting' || this.status === 'capturing') && (
            <button-container>
              <button
                data-theme={appDataStore.state.theme}
                class="btn btn-primary"
                disabled={this.selectedImageDataUrl === undefined || this.status === 'capturing'}
                onClick={async () => {
                  if (this.status !== 'sending') this.sendSelectedImageDataUrl();
                }}
              >
                Choose photo
              </button>
              <button
                class="btn btn-accent"
                disabled={this.status === 'capturing'}
                onClick={() => {
                  if ((this.status = 'selecting')) this.status = 'preReady';
                }}
              >
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
              onStartAgainClick={() => (this.status = 'preReady')}
            />
          )}
          {this.status === 'fail' && (
            <capture-cycle-confirm-photo-fail-screen
              onStartAgainClick={() => (this.status = 'preReady')}
            />
          )}
          <br />
        </div>
      </Host>
    );
  }
}
