"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TutorCardProps {
  name: string;
  skill: string;
  rating: number;
  pricePerHour: number;
  image: string;
}

export function TutorCard({
  name,
  skill,
  rating,
  pricePerHour,
  image,
}: TutorCardProps) {
  return (
    <div className="group rounded-xl border bg-background p-5 transition hover:shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Image
          src={image}
          alt={name}
          width={56}
          height={56}
          className="rounded-full object-cover"
        />

        <div className="flex-1">
          <h3 className="font-medium text-lg">{name}</h3>
          <Badge variant="secondary" className="mt-1">
            {skill}
          </Badge>
        </div>
      </div>

      {/* Rating & Price */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{rating}</span>
        </div>

        <span className="text-sm font-semibold">
          ${pricePerHour}
          <span className="text-muted-foreground">/hr</span>
        </span>
      </div>

      {/* CTA */}
      <Button
        className="mt-5 w-full transition group-hover:bg-primary"
        size="sm"
      >
        View Profile
      </Button>
    </div>
  );
}