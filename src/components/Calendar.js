import React, { useState, useEffect } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/list/main.css";

export default function Calendar() {
  const [training, setTraining] = useState([]);
  const sessions = [];

  useEffect(() => {
    getTraining();
  }, []);

  const getTraining = () => {
    fetch("https://customerrest.herokuapp.com/api/trainings")
      .then((response) => response.json())
      .then((response) => setTraining(response.content))
      .catch((err) => console.error(err));
  };

  for (var i = 0; i < training.length; i++) {
    var d = new Date(training[i].date);
    console.log(training[i]);
    sessions.push({
      title: training[i].activity,
      start: d,
      end: new Date(d.getTime() + training[i].duration * 60000),
    });
  }

  return (
    <div>
      <FullCalendar
        minTime="05:00"
        height="parent"
        defaultView="dayGridMonth"
        header={{
          left: "prev,next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        events={sessions}
      />
    </div>
  );
}
