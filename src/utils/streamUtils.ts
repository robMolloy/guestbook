export const getDefaultDeviceOrientation = async (p: { videoElement: HTMLVideoElement }) => {
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

export const getMaxVideoDimensions = async (p: {
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

export const getStreamSettings = async (p: { idealWidth: number; aspectRatio: number }) => {
  const videoElement = document.createElement('video');
  videoElement.style.opacity = '0';
  document.body.appendChild(videoElement);
  videoElement.autoplay = true;
  if (videoElement?.srcObject === undefined) return;

  const defaultDeviceOrientation = await getDefaultDeviceOrientation({ videoElement });
  const maxVideoDimensions = await getMaxVideoDimensions({
    isConventionalDeviceOrientation: defaultDeviceOrientation === 'conventional',
    ideal: p.idealWidth,
    aspectRatio: p.aspectRatio,
  });

  if (maxVideoDimensions === undefined) return;

  videoElement.srcObject = await navigator.mediaDevices.getUserMedia({
    video: {
      width: { ideal: maxVideoDimensions.videoElementWidth },
      height: { ideal: maxVideoDimensions.videoElementHeight },
    },
  });

  const ratio = 1 / 1.4;
  videoElement.remove();

  return {
    videoElementWidth: maxVideoDimensions.videoElementWidth * ratio,
    videoElementHeight: maxVideoDimensions.videoElementHeight * ratio,
    mediaWidth: maxVideoDimensions.mediaWidth * ratio,
    mediaHeight: maxVideoDimensions.mediaHeight * ratio,
    aspectRatio: maxVideoDimensions.aspectRatio,
  };
};
