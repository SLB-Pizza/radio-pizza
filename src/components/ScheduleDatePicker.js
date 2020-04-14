import React from "react";

const fakeDateData = [
  { dayOfWeek: "TUE", date: "Apr 14" },
  { dayOfWeek: "WED", date: "Apr 15" },
  { dayOfWeek: "THU", date: "Apr 16" },
  { dayOfWeek: "FRI", date: "Apr 17" },
  { dayOfWeek: "SAT", date: "Apr 18" },
  { dayOfWeek: "SUN", date: "Apr 19" },
  { dayOfWeek: "MON", date: "Apr 20" }
];

function ScheduleDatePicker() {
  return (
    <div className="columns is-mobile date-picker">
      {fakeDateData.map(day => (
        <div
          key={day.date}
          className="column is-5-mobile has-text-centered day-of-week"
        >
          <p className="title is-size-5-desktop is-size-6-touch">
            {day.dayOfWeek}
          </p>
          <p className="subtitle is-size-5-desktop is-size-6-touch">
            {day.date}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ScheduleDatePicker;
