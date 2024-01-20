import { Component, Element, h, Prop, Method, State } from '@stencil/core';
import { getImageDataUrlFromVideoElement } from '../../utils/imageDataUrlUtils';
import { onCountdown } from '../../utils/timeUtils';

@Component({
  tag: 'display-stream',
  shadow: true,
  styleUrls: ['./display-stream.css'],
})
export class DisplayStream {
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
      video: {
        width: { ideal: this.mediaDimensions?.mediaWidth },
        height: { ideal: this.mediaDimensions?.mediaHeight },
      },
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
    return imageDataUrlFromVideoElement;
  }
  @Method() async countdown(p: {
    start: number;
    stop: number;
    clear: boolean;
    delayInMs?: number;
    cb?: (num: number) => Promise<any> | any;
  }) {
    await onCountdown({
      start: p.start,
      stop: p.stop,
      delayInMs: p.delayInMs,
      onIncrement: (num: number) => (this.countdownInt = num),
      onComplete: !!p.clear ? () => (this.countdownInt = undefined) : undefined,
    });
    // const { start, stop, clear = false, delayInMs = 1000, cb = () => {} } = p;

    // const diff = Math.abs(start - stop);
    // const direction = start > stop ? 'negative' : 'positve';
    // const nums = Array(diff + 1)
    //   .fill(undefined)
    //   .map((_, j) => start + (direction === 'negative' ? -1 : 1) * j);

    // for (const num of nums) {
    //   this.countdownInt = num;
    //   await cb(num);
    //   await delay(delayInMs);
    // }
    // if (clear) this.clearCountdown();
    // return;
  }
  clearCountdown() {
    this.countdownInt = undefined;
    return;
  }

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            height: '37vh',
            width: `${37 * this.mediaDimensions.aspectRatio}vh`,
            position: 'relative',
          }}
        >
          {typeof this.countdownInt === 'number' && (
            <div class="countdownIntCircle">{this.countdownInt}</div>
          )}

          <div
            id="flash"
            ref={elm => (this.flashElement = elm)}
            onAnimationEnd={() => this.onFlashEnd()}
            class={this.isFlash ? 'flash' : ''}
          ></div>
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
