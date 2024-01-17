export const getImageDataUrlFromVideoElement = (p: { videoElement: HTMLVideoElement }) => {
  const canvas = document.createElement('canvas');

  const width = true ? p.videoElement.videoWidth : 1080;
  const height = true ? p.videoElement.videoHeight : 720;

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.scale(-1, 1);
  ctx.drawImage(p.videoElement, -width, 0, width, height);
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  const imageDataUrl = canvas.toDataURL('image/png');
  canvas.remove();
  return imageDataUrl;
};
