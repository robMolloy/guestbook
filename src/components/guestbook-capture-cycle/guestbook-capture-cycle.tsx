import { Component, Element, h, Prop, Method, State } from '@stencil/core';

const delay = async (x: number) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(true), x);
  });
};

const getImageDataUrlFromVideoElement = (p: { videoElement: HTMLVideoElement }) => {
  const canvas = document.createElement('canvas');

  const width = true ? p.videoElement.videoWidth : 1080;
  const height = true ? p.videoElement.videoHeight : 720;

  // canvas.width = p.videoElement.width;
  // canvas.height = p.videoElement.height;
  canvas.width = width;
  canvas.height = height;

  console.log({ videoElement: p.videoElement, canvas });
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.scale(-1, 1);
  ctx.drawImage(p.videoElement, -width, 0, width, height);
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  const imageDataUrl = canvas.toDataURL('image/png');
  canvas.remove();
  return imageDataUrl;
};
const getImageDataUrlFromWidthHeightAndVideoElement = (p: { videoElement: HTMLVideoElement; width: number; height: number }) => {
  const canvas = document.createElement('canvas');

  const width = false ? p.videoElement.width : p.width;
  const height = false ? p.videoElement.height : p.height;

  // canvas.width = p.videoElement.width;
  // canvas.height = p.videoElement.height;
  canvas.width = width;
  canvas.height = height;

  console.log({ videoElement: p.videoElement, canvas });
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.scale(-1, 1);
  ctx.drawImage(p.videoElement, -width, 0, width, height);
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  const imageDataUrl = canvas.toDataURL('image/png');
  canvas.remove();
  return imageDataUrl;
};

@Component({
  tag: 'guestbook-capture-cycle',
  shadow: true,
  styleUrls: ['./capture-countdown-screen.css'],
})
export class GuestbookCaptureCycle {
  @Prop() mediaDimensions!: {
    videoElementWidth: number;
    videoElementHeight: number;
    mediaWidth: number;
    mediaHeight: number;
    aspectRatio: number;
  };
  @State() countdownInt?: number;

  @Element() rootElement: HTMLElement | undefined;
  videoElement: HTMLVideoElement | undefined;

  @State() isFlash: boolean = false;
  flashElement: HTMLDivElement | undefined;

  onComponentDidLoad = async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: { width: { ideal: this.mediaDimensions?.mediaWidth }, height: { ideal: this.mediaDimensions?.mediaHeight } },
    });

    if (!!this.videoElement) this.videoElement.srcObject = mediaStream;
  };
  componentDidLoad() {
    this.onComponentDidLoad();
  }

  flash() {
    this.isFlash = true;
  }
  onFlashEnd() {
    this.isFlash = false;
  }

  @Method() async capture() {
    if (!this.videoElement) return;
    this.flash();
    const imageDataUrlFromVideoElement = getImageDataUrlFromVideoElement({
      videoElement: this.videoElement,
    });
    // const imageDataUrlFromVideoElement = getImageDataUrlFromWidthHeightAndVideoElement({
    //   videoElement: this.videoElement,
    //   width: this.mediaDimensions.videoElementWidth,
    //   height: this.mediaDimensions.videoElementHeight,
    // });
    return imageDataUrlFromVideoElement;
  }
  @Method() async countdown({ start, stop, clear = false }: { start: number; stop: number; clear: boolean }) {
    const diff = Math.abs(start - stop);
    const direction = start > stop ? 'negative' : 'positve';
    const nums = Array(diff + 1)
      .fill(undefined)
      .map((_, j) => start + (direction === 'negative' ? -1 : 1) * j);

    for (const num of nums) {
      this.countdownInt = num;
      await delay(1000);
    }
    if (clear) this.clearCountdown();
    return;
  }
  clearCountdown() {
    this.countdownInt = undefined;
    return;
  }

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ height: '37vh', width: `${37 * this.mediaDimensions.aspectRatio}vh`, position: 'relative' }}>
          {typeof this.countdownInt === 'number' && <div class="countdownIntCircle">{this.countdownInt}</div>}

          <div id="flash" ref={elm => (this.flashElement = elm)} onAnimationEnd={() => this.onFlashEnd()} class={this.isFlash ? 'flash' : ''}></div>
          <video
            ref={elm => (this.videoElement = elm)}
            style={{ transform: 'scaleX(-1)', height: '100%', width: '100%' }}
            width={this.mediaDimensions.videoElementWidth}
            height={this.mediaDimensions.videoElementWidth}
            autoPlay
          />
        </div>
      </div>
    );
  }
}
