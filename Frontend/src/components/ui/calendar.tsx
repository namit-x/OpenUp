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

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg w-max mx-auto">
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
