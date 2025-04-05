"use client";

import React, { useState } from "react";
import { DatePicker } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const DateRangePicker: React.FC<{
  startDate: Date | null;
  endDate: Date | null;
  onChange: (dates: [Date | null, Date | null]) => void;
}> = ({ startDate, endDate, onChange }) => {
  return (
    <div className="flex space-x-4">
      <div className="flex flex-col">
        <label>Start Date</label>
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => onChange([date, endDate])}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="yyyy-MM-dd"
          className="px-4 py-2 border rounded-md"
        />
      </div>
      <div className="flex flex-col">
        <label>End Date</label>
        <DatePicker
          selected={endDate}
          onChange={(date: Date) => onChange([startDate, date])}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate || undefined}
          dateFormat="yyyy-MM-dd"
          className="px-4 py-2 border rounded-md"
        />
      </div>
    </div>
  );
};
