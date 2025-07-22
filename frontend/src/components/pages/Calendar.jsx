import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // for date click


const Calendar = () => {
  const [events, setEvents] = useState([
    { title: "Meeting", date: "2025-07-24" },
    { title: "Demo", date: "2025-07-28" },
  ]);

  const handleDateClick = (arg) => {
    const title = prompt("Enter Event Title:");
    if (title) {
      setEvents([...events, { title, date: arg.dateStr }]);
    }
  };

  return (
    <div className="relative min-h-screen pb-20 bg-[#1c1f24] text-white">
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">📅 My Calendar</h2>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          dateClick={handleDateClick}
          events={events}
          height="auto"
        />
      </div>


    </div>
  );
};

export default Calendar;
