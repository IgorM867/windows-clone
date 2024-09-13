const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
] as const;

type Month = (typeof months)[number];

export function getMonthString(monthNumber: number): Month {
  return months[monthNumber];
}

export function getMonthDaysNumber(month: number, year: number): 28 | 29 | 30 | 31 {
  if ([0, 2, 4, 6, 7, 9, 11].includes(month)) return 31;
  if ([3, 5, 8, 10].includes(month)) return 30;
  if (month == 1) {
    if (year % 4 !== 0) return 28;
    if (year % 100 === 0 && year % 400 !== 0) return 28;
    return 29;
  }

  throw new Error(`Inavalid month: ${month}`);
}
export type Date = {
  year: number;
  month: number;
  day: number;
};

export function compareDates(date1: Date, date2: Date): boolean {
  return date1.day === date2.day && date1.month === date2.month && date1.year === date2.year;
}
