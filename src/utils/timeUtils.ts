const isRapid = true;
export const delay = async (x: number) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(true), x / (isRapid ? 10 : 1));
  });
};
