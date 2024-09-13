import { useEffect, useState } from "react";
import { getMonthString } from "../../../utils/dates";

const daysOfTheWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

export function useCurrentTime() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const now = new Date();
    const millisecondsUntilNextSecond = 1000 - now.getMilliseconds();

    let interval: number;

    const timeout = setTimeout(() => {
      setNow(new Date());
      interval = setInterval(() => {
        setNow(new Date());
      }, 1000);
    }, millisecondsUntilNextSecond);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  const time = now.toLocaleTimeString();
  const dateNumeric = getDate();
  const monthString = getMonthString(now.getMonth());
  const dateLong = `${daysOfTheWeek[now.getDay()]}, ${now.getDate()} ${monthString} ${now.getFullYear()}`;

  return { time, dateNumeric, dateLong };
}
function getDate() {
  const now = new Date();
  const day = now.getDate();
  const date = now.toLocaleString().slice(0, 9);

  return day < 10 ? "0" + date : date;
}
