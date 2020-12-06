import moment from "moment";

export const toCents = (price) => {
  return (price / 100).toFixed(2);
};

export const getRelativeTime = (date) => {
  const relativeTime = moment(date, "YYYY/MM/DD h:mm:ss").fromNow();
  const parsedTime = relativeTime.split(" ");
  if (parsedTime[0] > 7 && parsedTime[1] === "days") {
    return date;
  } else {
    return relativeTime;
  }
};

export const uppercaseFirstLetter = (text) => {
  return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
};
