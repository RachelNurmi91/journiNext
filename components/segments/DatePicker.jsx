"use client"

import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import localeEn from "air-datepicker/locale/en";

new AirDatepicker('#input');

import React, { useEffect, useRef } from "react";

function DatePicker({
  label,
  date,
  setDate,
  includeTime = false,
}) {

  const datePickerRef = useRef(null);

  useEffect(() => {
    new AirDatepicker(datePickerRef.current, {
      locale: localeEn,
      selectedDates: date,
      onSelect: (formattedDate) => {
        setDate(formattedDate.date, label);
      },
      dateFormat: "MM/dd/yy",
      timepicker: includeTime,
      timeFormat: 'hh:mm AA',
      minutesStep: 5,
      autoClose: true,
    });
  }, []);

  return (
    <div className="w-1/2 mb-0 px-3 mb-0">
    <label 
      htmlFor="input"
      className="block tracking-wide text-sm font-bold mb-2"
    >
      {label}
    </label>
    <input 
      ref={datePickerRef} 
      className="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-neutral-50 text-sm"
    />
  </div>
);
}

export default DatePicker;
