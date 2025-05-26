import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'; // import default styles

const CalendarComponent = () => {
  const [value, setValue] = useState(new Date());

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-100">
    <div className="bg-white p-6 rounded-xl shadow">
    <div className="p-4 bg-white rounded shadow-md w-fit mx-auto">
      <Calendar onChange={setValue} value={value} />
      <p className="mt-4"> {value.toDateString()}</p>
    </div>
    </div>
    </div>

  );
};

export default CalendarComponent;
