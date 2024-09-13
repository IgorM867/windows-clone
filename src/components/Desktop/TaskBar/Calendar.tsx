import { memo, useMemo, useRef, useState } from "react";
import { TAKSBAR_HEIGHT } from "../../../constants";
import AngleDown from "./AngleDown";
import AngleUp from "./AngleUp";
import { compareDates, type Date, getMonthDaysNumber, getMonthString } from "../../../utils/dates";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";

type CalendarPros = {
  time: string;
  dateLong: string;
  close: () => void;
};

type Month = {
  index: number;
  year: number;
};

function Calendar({ time, dateLong, close }: CalendarPros) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"up" | "down">("up");

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, close);

  const hadndleMonthsUp = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setDirection("up");

    setTimeout(() => {
      setSelectedMonth((prev) => (prev < 11 ? selectedMonth + 1 : 0));
      if (selectedMonth === 11) {
        setSelectedYear(selectedYear + 1);
      }
      setIsAnimating(false);
    }, 150);
  };
  const hadndleMonthsDown = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setDirection("down");

    setTimeout(() => {
      setSelectedMonth((prev) => (prev > 0 ? selectedMonth - 1 : 11));
      if (selectedMonth === 0) {
        setSelectedYear(selectedYear - 1);
      }
      setIsAnimating(false);
    }, 150);
  };

  return (
    <div
      className={`absolute right-0 bg-window-primary h-[460px] z-10 border border-text-secondary`}
      style={{ bottom: TAKSBAR_HEIGHT }}
      ref={ref}
    >
      <div className="p-5 border-b border-text-secondary">
        <time className="text-5xl tracking-normal">{time}</time>
        <p className="text-[#a6d8ff]">{dateLong}</p>
      </div>
      <div className="px-5 py-3 flex justify-between">
        <p>{`${getMonthString(selectedMonth)} ${selectedYear}`}</p>
        <div className="flex gap-8 pr-2">
          <AngleUp onClick={hadndleMonthsDown} />
          <AngleDown onClick={hadndleMonthsUp} />
        </div>
      </div>
      <div className="h-72">
        <div className="grid grid-cols-7 px-3 gap-1 text-center text-sm ">
          <div>mon</div>
          <div>tue</div>
          <div>wed</div>
          <div>thu</div>
          <div>fri</div>
          <div>sat</div>
          <div>sun</div>
        </div>
        <div className="h-64 overflow-hidden ">
          <div
            className={`transition-transform`}
            style={{
              transform: `${isAnimating ? (direction === "up" ? "translateY(-100%)" : "translateY(100%)") : ""}`,
            }}
          >
            <MonthView month={selectedMonth} year={selectedYear} />
          </div>
        </div>
      </div>
    </div>
  );
}

type MonthViewProps = {
  month: number;
  year: number;
};

const MonthView = memo(function MonthView({ month, year }: MonthViewProps) {
  const [dates, today] = useMemo(() => getMonthViewDays({ index: month, year }), [month, year]);
  const [selectedDate, setSelectedDate] = useState<Date>(today);

  return (
    <ul className={`grid grid-cols-7 px-3 gap-1 text-center text-sm relative`}>
      {dates.map((date, i) => (
        <li
          key={i}
          className={`w-11 h-10 grid place-items-center hover:border-2 
            ${date.month === month ? "text-white" : "text-text-secondary"}
            ${compareDates(date, today) ? "bg-windows-blue" : ""}
            ${compareDates(date, selectedDate) ? "border-windows-blue border-2" : ""}`}
          onClick={() => setSelectedDate(date)}
        >
          {date.day}
        </li>
      ))}
    </ul>
  );
});

function getMonthViewDays(month: Month): [Date[], Date] {
  const date = new Date();
  date.setFullYear(month.year, month.index, 1);
  const startDay = date.getDay();

  const daysMonthBefore = startDay === 0 ? 6 : startDay - 1;
  const monthBefore = month.index === 0 ? 11 : month.index - 1;
  const yearMonthBefore = month.index === 0 ? month.year - 1 : month.year;
  const monthBeforeLenght = getMonthDaysNumber(monthBefore, yearMonthBefore);
  const firstDay = monthBeforeLenght - daysMonthBefore + 1;

  const dates: Date[] = [];
  for (let i = firstDay; i <= monthBeforeLenght; i++) {
    dates.push({ day: i, month: monthBefore, year: yearMonthBefore });
  }
  for (let i = 1; i <= getMonthDaysNumber(month.index, month.year); i++) {
    dates.push({ day: i, month: month.index, year: month.year });
  }
  const daysFromNextMonth = 42 - dates.length;
  const monthAfter = month.index === 11 ? 0 : month.index + 1;
  const yearMonthAfter = month.index === 11 ? month.year + 1 : month.year;
  for (let i = 1; i <= daysFromNextMonth; i++) {
    dates.push({ day: i, month: monthAfter, year: yearMonthAfter });
  }

  const now = new Date();
  const today: Date = { day: now.getDate(), month: now.getMonth(), year: now.getFullYear() };

  return [dates, today];
}
export default Calendar;
