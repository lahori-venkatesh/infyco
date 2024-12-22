"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { format, parse, addMinutes } from "date-fns";
import type { Mentor } from "@/lib/types";

interface BookingCalendarProps {
  mentor: Mentor;
  onSelect: (date: Date, time: string) => void;
  onBack: () => void;
}

export function BookingCalendar({ mentor, onSelect, onBack }: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();

  const getTimeSlots = () => {
    if (!selectedDate) return [];
    
    const [startTime, endTime] = mentor.availability[1].split(" - ");
    const times = [];
    let current = parse(startTime, "h:mm a", new Date());
    const end = parse(endTime, "h:mm a", new Date());

    while (current <= end) {
      times.push(format(current, "h:mm a"));
      current = addMinutes(current, 30);
    }

    return times;
  };

  const isDateDisabled = (date: Date) => {
    const day = format(date, "EEEE").toLowerCase();
    const availableDays = mentor.availability[0].toLowerCase();
    return !availableDays.includes(day);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-xl font-semibold">Schedule Your Session</h2>
          <p className="text-sm text-muted-foreground">
            Choose your preferred date and time
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-2">Select Date</h3>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
            disabled={isDateDisabled}
          />
        </div>

        {selectedDate && (
          <div>
            <h3 className="text-sm font-medium mb-2">Select Time</h3>
            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a time slot" />
              </SelectTrigger>
              <SelectContent>
                {getTimeSlots().map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <Button
          className="w-full"
          disabled={!selectedDate || !selectedTime}
          onClick={() => selectedDate && selectedTime && onSelect(selectedDate, selectedTime)}
        >
          Continue to Payment
        </Button>
      </div>
    </Card>
  );
}