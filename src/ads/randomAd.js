import { ads } from "./ads.json";

let lastNumber;

const getRandomNumber = () => {
  let x = Math.floor(Math.random() * ads.length);
  if (x === lastNumber) {
    return getRandomNumber();
  }
  return x;
};

export const getAd = () => {
  const number = getRandomNumber();
  lastNumber = number;
  return [ads[number]];
};
