import { ShowDate } from "../../api/showsApi";

// eslint-disable-next-line import/prefer-default-export
export const getNextDays = (numOfDays: number): ShowDate[] =>
  Array.from(Array(numOfDays).keys()).map((n) => {
    const day = new Date(new Date().getTime() + n * (24 * 60 * 60 * 1000));
    return {
      year: day.getFullYear(),
      month: day.getMonth() + 1,
      day: day.getDate(),
    };
  });
