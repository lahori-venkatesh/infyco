"use client";

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

interface CalendarProps {
  mode?: "single";
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  className?: string;
  disabled?: (date: Date) => boolean;
  fromDate?: Date;
}

export function Calendar({
  mode = "single",
  selected,
  onSelect,
  className,
  disabled,
  fromDate,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(selected || new Date());
  
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const isSelected = (date: Date) => {
    if (!selected) return false;
    return date.toDateString() === selected.toDateString();
  };

  const isDisabled = (date: Date) => {
    if (fromDate && date < fromDate) return true;
    if (disabled) return disabled(date);
    return false;
  };

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className={cn("p-3", className)}>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePreviousMonth}
          className={buttonVariants({ variant: "outline", size: "icon" })}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="font-semibold">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </div>
        <button
          onClick={handleNextMonth}
          className={buttonVariants({ variant: "outline", size: "icon" })}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            index + 1
          );
          const isDisabledDate = isDisabled(date);

          return (
            <button
              key={index}
              onClick={() => !isDisabledDate && onSelect?.(date)}
              disabled={isDisabledDate}
              className={cn(
                "h-9 w-9 rounded-md text-sm p-0 font-normal",
                "hover:bg-accent hover:text-accent-foreground",
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                isSelected(date) && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                isDisabledDate && "text-muted-foreground opacity-50 cursor-not-allowed hover:bg-transparent"
              )}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}