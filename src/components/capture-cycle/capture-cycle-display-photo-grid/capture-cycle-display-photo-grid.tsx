import appDataStore from '@/src/stores/appDataStore';
import { Component, Event, EventEmitter, h, Method, State } from '@stencil/core';

const getInitialImageDataUrls = () =>
  [undefined, undefined, undefined, undefined] as [string?, string?, string?, string?];
@Component({
  tag: 'capture-cycle-display-photo-grid',
  styleUrls: ['./capture-cycle-display-photo-grid.css', '../../../styles/daisyUi.css'],
  shadow: true,
})
export class CaptureCycleDisplayPhotoGrid {
  @State() imageDataUrls: [string?, string?, string?, string?] = getInitialImageDataUrls();

  @Method() async addImageDataUrls(newImageDataUrls: string) {
    const isFull = !this.imageDataUrls.includes(undefined);
    if (isFull) this.imageDataUrls = getInitialImageDataUrls();

    const i = this.imageDataUrls.findIndex(x => x === undefined);

    if (typeof i === undefined) return;
    this.imageDataUrls[i] = newImageDataUrls;
    this.imageDataUrls = [...this.imageDataUrls];
  }

  @Method() async clearImageDataUrls() {
    this.imageDataUrls = [undefined, undefined, undefined, undefined];
  }

  @Event({ eventName: 'selectPhoto' })
  selectPhoto!: EventEmitter<string>;

  render() {
    return (
      <div class="capture-canvases-container" data-theme={appDataStore.state.theme}>
        {[0, 1, 2, 3].map(x => {
          return (
            <span
              class="capture-canvas bg-primary"
              style={{ backgroundImage: `url('${this.imageDataUrls?.[x]}')` }}
              onClick={() => {
                this.selectPhoto?.emit(this.imageDataUrls?.[x]);
              }}
            >
              <span class="captured-image-number"> {x + 1} </span>
            </span>
          );
        })}
      </div>
    );
  }
}
