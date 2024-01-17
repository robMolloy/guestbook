import { Component, h, Method, State } from '@stencil/core';

@Component({
  tag: 'display-photo-grid',
  styleUrls: ['./display-photo-grid.css'],
  shadow: true,
})
export class DisplayPhotoGrid {
  @State() imageDataUrls: [string?, string?, string?, string?] = [undefined, undefined, undefined, undefined];

  @Method() async addImageDataUrls(newImageDataUrls: string) {
    const i = this.imageDataUrls.findIndex(x => x === undefined);
    if (typeof i === undefined) return;
    this.imageDataUrls[i] = newImageDataUrls;
    this.imageDataUrls = [...this.imageDataUrls];
  }

  @Method() async clearImageDataUrls() {
    this.imageDataUrls = [undefined, undefined, undefined, undefined];
  }

  render() {
    return (
      <div class="capture-canvases-container">
        {/* {JSON.stringify(this.imageDataUrls)} */}
        {[0, 1, 2, 3].map(x => {
          return (
            <span class="capture-canvas" style={{ backgroundImage: `url('${this.imageDataUrls?.[x]}')` }}>
              <span class="captured-image-number"> {x + 1} </span>
            </span>
          );
        })}
      </div>
    );
  }
}
