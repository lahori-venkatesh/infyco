"use client";

import { EventsList } from "@/components/events/events-list";
import { EventFilters } from "@/components/events/event-filters";
import { useState } from "react";
import type { EventType } from "@/lib/types";

export default function EventsPage() {
  const [selectedType, setSelectedType] = useState<EventType>("all");

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Events & Opportunities</h1>
          <p className="text-muted-foreground mt-1">
            Discover internships, courses, guest lectures, and hackathons
          </p>
        </div>

        <EventFilters
          selectedType={selectedType}
          onTypeChange={setSelectedType}
        />

        <EventsList selectedType={selectedType} />
      </div>
    </div>
  );
}