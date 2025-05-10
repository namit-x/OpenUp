import React from 'react';
import { DayPicker, Matcher } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

interface CalendarProps {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  className?: string;
  disabled?: Matcher | Matcher[];
  modifiers?: Record<string, Matcher | Matcher[]>;
  modifiersClassNames?: Record<string, string>;
}

export const Calendar: React.FC<CalendarProps> = ({
  selected,
  onSelect,
  className = '',
  disabled,
  modifiers,
  modifiersClassNames,
}) => {
  const [currentMonth, setCurrentMonth] = React.useState<Date>(new Date());

  const handleMonthChange = (month: Date) => {
    setCurrentMonth(month);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(e.target.value);
    const updatedDate = new Date(currentMonth);
    updatedDate.setFullYear(newYear);
    setCurrentMonth(updatedDate);
  };

  // Generate years from 1900 to current year + 20
  const years = Array.from({ length: 60 }, (_, i) => 2025 - i);

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg w-max mx-auto">
      <div className="mb-4">
        <label htmlFor="year" className="mr-2">
          Select Year:
        </label>
        <select
          id="year"
          value={currentMonth.getFullYear()}
          onChange={handleYearChange}
          className="text-black p-1 rounded"
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
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
        className={`bg-gray-800 rounded-lg ${className}`}
      />
    </div>
  );
};
