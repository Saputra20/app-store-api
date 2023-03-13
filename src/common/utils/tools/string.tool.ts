import { randomUUID } from 'crypto';

export const toCapital = (string) => {
  const arr = string.split(' ');
  for (let index = 0; index < arr.length; index++) {
    arr[index] = arr[index].charAt(0).toUpperCase() + arr[index].slice(1);
  }

  return arr.join(' ');
};

export const generateRandomFileName = (mimetype: string) => {
  const extension = mimetype.split('/').splice(-1)[0];
  return `${randomUUID()}.${extension}`;
};
