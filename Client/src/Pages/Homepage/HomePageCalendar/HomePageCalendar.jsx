import React from "react";
import Calendar from "react-calendar";
import "./HomePageCalendar.css";
import { useState } from "react";
// import "react-calendar/dist/Calendar.css";
import "./HomePageCalendar.css";

function HomePageCalendar() {
  const [date, setDate] = useState(new Date());

  const onChange = () => {
    setDate(date);
  };

  return (
    <div className="hp-calendar-container">
      <h1 className="hp-calendar-title">Your Calendar</h1>
      <Calendar onChange={onChange} value={date}></Calendar>
      {/* {console.log(date)} */}
      {/* {date.toString} */}
    </div>
  );
}

export default HomePageCalendar;

// https://www.youtube.com/watch?v=eM8n55lad1c&t=28s
// https://www.npmjs.com/package/react-calendar?activeTab=readme
