import { useState } from "react";
import { useCurrentTime } from "./useTime";
import Calendar from "./Calendar";

function Clock() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { time, dateNumeric, dateLong } = useCurrentTime();

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  return (
    <>
      <div
        className="flex flex-col justify-center text-sm px-2 text-center leading-5 hover:backdrop-brightness-125"
        onClick={toggleCalendar}
      >
        <time>{time.slice(0, 5)}</time>
        <time>{dateNumeric}</time>
      </div>
      {isCalendarOpen && <Calendar time={time} dateLong={dateLong} close={() => setIsCalendarOpen(false)} />}
    </>
  );
}

export default Clock;
