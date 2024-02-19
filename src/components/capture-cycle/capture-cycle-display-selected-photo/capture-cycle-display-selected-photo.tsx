import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'capture-cycle-display-selected-photo',
  styleUrl: '../../../styles/daisyUi.css',
  shadow: true,
})
export class DisplaySelectedPhoto {
  @Prop() selectedImageDataUrl?: string = undefined;

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          class="bg-primary text-primary-content"
          style={{
            height: '37vh',
            width: `${(37 * 6) / 4}vh`,
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
              <custom-h2>
                Your favourite photo will display <br /> here once chosen
              </custom-h2>
            </div>
          )}
        </div>
      </div>
    );
  }
}
