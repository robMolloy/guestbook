import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'capture-cycle-display-selected-photo',
  shadow: true,
})
export class DisplaySelectedPhoto {
  @Prop() selectedImageDataUrl?: string = undefined;

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            height: '37vh',
            width: `${(37 * 6) / 4}vh`,
            backgroundColor: '#eee',
            position: 'relative',
            backgroundImage: `url('${this.selectedImageDataUrl}')`,
            backgroundSize: 'cover',
            backgroundposition: 'center',
          }}
        >
          {this.selectedImageDataUrl === undefined && (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '2rem',
              }}
            >
              <custom-h2>Select your favourite image</custom-h2>
            </div>
          )}
        </div>
      </div>
    );
  }
}
