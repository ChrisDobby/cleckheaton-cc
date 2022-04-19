import { isSaturday, isSunday, format, addDays } from 'date-fns';

const { SEASON_START, SEASON_END } = process.env;
const SEASON_START_DATE = new Date(SEASON_START as string);
const SEASON_END_DATE = new Date(SEASON_END as string);

export const isMatchDay = (date: Date) =>
  date >= SEASON_START_DATE &&
  date <= SEASON_END_DATE &&
  (isSaturday(date) || isSunday(date));

export const getMatchDates = (date: Date) => {
  if (isSaturday(date)) {
    return [format(date, 'yyyy-MM-dd'), format(addDays(date, 1), 'yyyy-MM-dd')];
  }

  if (isSunday(date)) {
    return [
      format(date, 'yyyy-MM-dd'),
      format(addDays(date, -1), 'yyyy-MM-dd'),
    ];
  }

  return [];
};
