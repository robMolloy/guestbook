const isRapid = true;
export const delay = async (x: number) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(true), x / (isRapid ? 10 : 1));
  });
};

export const onCountdown = async (p: {
  start: number;
  stop: number;
  delayInMs?: number;
  onIncrement: (num: number) => Promise<any> | any;
  onComplete?: () => Promise<any> | any;
}) => {
  const { start, stop, delayInMs = 1000, onIncrement, onComplete } = p;

  const diff = Math.abs(start - stop);
  const direction = start > stop ? 'negative' : 'positve';
  const nums = Array(diff + 1)
    .fill(undefined)
    .map((_, j) => start + (direction === 'negative' ? -1 : 1) * j);

  for (const num of nums) {
    await onIncrement(num);
    await delay(delayInMs);
  }
  if (onComplete) await onComplete();
  return;
};
