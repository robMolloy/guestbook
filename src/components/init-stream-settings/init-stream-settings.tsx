import { Component, Element, Event, h, State, EventEmitter, Prop } from '@stencil/core';
import { getImageDataUrlFromVideoElement } from '../../utils/imageDataUrlUtils';

const getDefaultDeviceOrientation = async (p: { videoElement: HTMLVideoElement }) => {
  const mediaStream = await navigator.mediaDevices.getUserMedia({
    video: { aspectRatio: 2, width: { ideal: 100 } },
  });

  p.videoElement.srcObject = mediaStream;
  const { width, height } = p.videoElement.getBoundingClientRect();
  const videoElementAspectRatio = width / height;
  const defaultDeviceOrientation = videoElementAspectRatio > 1 ? 'conventional' : 'rotated';

  mediaStream.getTracks().forEach(track => track.stop());
  return defaultDeviceOrientation;
};

const getMaxVideoDimensions = async (p: {
  isConventionalDeviceOrientation: boolean;
  aspectRatio: number;
  ideal: number;
}) => {
  const widthKey = p.isConventionalDeviceOrientation ? 'width' : 'height';
  const heightKey = p.isConventionalDeviceOrientation ? 'height' : 'width';

  const constraints = {
    video: { [widthKey]: { ideal: p.ideal }, [heightKey]: { ideal: p.ideal } },
  } as const;
  const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);

  const mediaStreamTrack = mediaStream.getVideoTracks().find(x => !!x);
  if (!mediaStreamTrack) return;
  const mediaStreamTrackSettings = mediaStreamTrack.getSettings();

  const wMax = mediaStreamTrackSettings.width;
  const hMax = mediaStreamTrackSettings.height;

  if (!wMax || !hMax) return;

  const width = wMax / hMax <= p.aspectRatio ? wMax : hMax * p.aspectRatio;
  const height = wMax / hMax <= p.aspectRatio ? hMax / p.aspectRatio : hMax;

  return {
    videoElementWidth: width,
    videoElementHeight: height,
    mediaWidth: p.isConventionalDeviceOrientation ? width : height,
    mediaHeight: p.isConventionalDeviceOrientation ? height : width,
    aspectRatio: p.aspectRatio,
  };
};

@Component({
  tag: 'init-stream-settings',
  shadow: true,
})
export class initStreamSettings {
  @Prop() idealWidth!: number;
  @Prop() aspectRatio!: number;
  @State() status:
    | 'loading'
    | 'gettingDefaultDeviceOrientation'
    | 'gettingMaxVideoDimensions'
    | 'error' = 'loading';
  @Element() rootElement?: HTMLElement;
  videoElement: HTMLVideoElement | undefined;

  @Event({ eventName: 'initSettingsError' })
  initSettingsError?: EventEmitter<string>;
  emitInitSettingsError = (errorMessage: string) => {
    this.initSettingsError?.emit(errorMessage);
    this.status = 'error';
  };

  @Event({ eventName: 'initSettingsComplete' })
  initSettingsComplete?: EventEmitter<{
    videoElementWidth: number;
    videoElementHeight: number;
    mediaWidth: number;
    mediaHeight: number;
    aspectRatio: number;
    imageDataUrlLength?: number;
  }>;

  onComponentDidLoad = async () => {
    const videoElement = this.videoElement;
    if (videoElement?.srcObject === undefined)
      return this.emitInitSettingsError('cannot find video element');

    this.status = 'gettingDefaultDeviceOrientation';
    const defaultDeviceOrientation = await getDefaultDeviceOrientation({ videoElement });

    this.status = 'gettingMaxVideoDimensions';
    const maxVideoDimensions = await getMaxVideoDimensions({
      isConventionalDeviceOrientation: defaultDeviceOrientation === 'conventional',
      ideal: this.idealWidth,
      aspectRatio: this.aspectRatio,
    });

    if (maxVideoDimensions === undefined)
      return this.emitInitSettingsError('cannot get maxVideoDimensions');

    const imageDataUrl = getImageDataUrlFromVideoElement({ videoElement });
    if (this.initSettingsComplete)
      this.initSettingsComplete.emit({
        ...maxVideoDimensions,
        imageDataUrlLength: imageDataUrl?.length,
      });
  };

  componentDidLoad() {
    this.onComponentDidLoad();
  }

  render() {
    return (
      <div>
        {this.status}
        <div>
          <video
            ref={elm => (this.videoElement = elm)}
            style={{ border: 'solid 1px red' }}
            autoPlay
          ></video>
        </div>
      </div>
    );
  }
}
