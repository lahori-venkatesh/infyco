"use client";

import { PeersList } from "@/components/peers/peers-list";
import { PeerFilters } from "@/components/peers/peer-filters";
import { useState } from "react";

export default function PeersPage() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState("all");

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Connect with Peers</h1>
          <p className="text-muted-foreground mt-1">
            Find and connect with other learners in your field
          </p>
        </div>

        <PeerFilters
          selectedSkills={selectedSkills}
          onSkillsChange={setSelectedSkills}
          selectedLevel={selectedLevel}
          onLevelChange={setSelectedLevel}
        />

        <PeersList
          selectedSkills={selectedSkills}
          selectedLevel={selectedLevel}
        />
      </div>
    </div>
  );
}