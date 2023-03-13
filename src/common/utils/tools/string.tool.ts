export const toCapital = (string) => {
  const arr = string.split(' ');
  for (let index = 0; index < arr.length; index++) {
    arr[index] = arr[index].charAt(0).toUpperCase() + arr[index].slice(1);
  }

  return arr.join(' ');
};
