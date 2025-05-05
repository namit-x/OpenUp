import React from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css'; // Import styles

interface CalendarProps {
  selected: Date | undefined; // 'selected' can be a Date or undefined
  onSelect: (date: Date | undefined) => void; // 'onSelect' callback function to update selected date
  className: string; // for custom styling classes
  disabled: (date: Date) => boolean; // custom function to disable certain dates
}

const Calendar: React.FC<CalendarProps> = ({ selected, onSelect, className, disabled }) => {
  const [currentMonth, setCurrentMonth] = React.useState<Date>(new Date());

  // Handle month change
  const handleMonthChange = (month: Date) => {
    setCurrentMonth(month);
  };

  // Handle year change from dropdown
  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(event.target.value, 10);
    setCurrentMonth(new Date(newYear, currentMonth.getMonth(), 1)); // Set the new year, keep the current month
  };

  // Get the current year to populate the year options
  const currentYear = currentMonth.getFullYear();
  const years = Array.from({ length: 60 }, (_, index) => currentYear - 60 + index); // Array of years around current year

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
        selected={selected} // Passing the selected date
        onSelect={onSelect} // Passing the callback function to update the selected date
        month={currentMonth} // Controlled month view
        onMonthChange={handleMonthChange} // Month change handler
        disabled={disabled} // Disable dates function
        className={`bg-gray-800 rounded-lg ${className}`} // Custom class names
      />
    </div>
  );
};

export { Calendar };
