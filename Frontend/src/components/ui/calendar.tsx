import React from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css'; // Import styles

interface CalendarProps {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  className: string;
  disabled: (date: Date) => boolean;
}

const Calendar: React.FC<CalendarProps> = ({ selected, onSelect, className, disabled }) => {
  const [currentMonth, setCurrentMonth] = React.useState<Date>(new Date());

  // Handle month change from calendar navigation
  const handleMonthChange = (month: Date) => {
    setCurrentMonth(month); // just update state with new month
  };

  // Handle year change from dropdown
  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(event.target.value, 10);
    setCurrentMonth(new Date(newYear, currentMonth.getMonth(), 1));
  };

  // Static year range: 1960–2079
  const years = Array.from({ length: 60 }, (_, i) => 1960 + i);

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg w-max mx-auto">
      <div className="mb-4 flex items-center gap-3">
        <label htmlFor="year-select" className="text-lg">Select Year:</label>
        <select
          id="year-select"
          onChange={handleYearChange}
          value={currentMonth.getFullYear()}
          className="bg-gray-700 text-white border border-gray-600 p-2 rounded-md"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <DayPicker
        mode="single"
        selected={selected}
        onSelect={onSelect}
        month={currentMonth}
        onMonthChange={handleMonthChange}
        disabled={disabled}
        className={`bg-gray-800 rounded-lg ${className}`}
      />
    </div>
  );
};

export { Calendar };
