"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Building2, Heart, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { MentorProfile } from "./profile/mentor-profile";
import type { Mentor } from "@/lib/types";
import Link from "next/link";

interface MentorCardProps {
  mentor: Mentor;
}

export function MentorCard({ mentor }: MentorCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <Card className="overflow-hidden">
        <div className="p-6">
          <div className="flex items-start space-x-4">
            <img
              src={mentor.image}
              alt={mentor.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{mentor.name}</h3>
                  <p className="text-muted-foreground text-sm">{mentor.profession}</p>
                  <div className="flex items-center mt-1 text-sm">
                    <Building2 className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-muted-foreground">{mentor.company}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="ml-1 text-sm">{mentor.rating}</span>
                    <span className="text-sm text-muted-foreground ml-1">
                      ({mentor.totalMentees} mentees)
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "rounded-full",
                      isLiked && "text-red-500 hover:text-red-600"
                    )}
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart className="h-5 w-5" fill={isLiked ? "currentColor" : "none"} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    asChild
                  >
                    <Link href={`/messages?mentor=${mentor.id}`}>
                      <MessageCircle className="h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
            {mentor.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {mentor.skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
            {mentor.skills.length > 3 && (
              <Badge variant="outline">+{mentor.skills.length - 3} more</Badge>
            )}
          </div>

          <Button
            className="w-full mt-4"
            onClick={() => setShowProfile(true)}
          >
            <span className="text-white">View Details & Connect</span>
          </Button>
        </div>
      </Card>

      <MentorProfile
        mentor={mentor}
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
      />
    </>
  );
}