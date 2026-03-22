"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

interface TutorCardProps {
  tutor: any;
}

export default function TutorCard({ tutor }: TutorCardProps) {
  const router = useRouter();

  return (
    <div className="group rounded-xl border bg-background p-5 transition hover:shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Image
          src="/avatar.png"
          alt={tutor.user.name}
          width={56}
          height={56}
          className="rounded-full object-cover"
        />

        <div className="flex-1">
          <h3 className="text-lg font-medium">{tutor.user.name}</h3>
          <p className="text-xs text-muted-foreground">
            {tutor.user.email}
          </p>

          {tutor.categories?.[0] && (
            <Badge variant="secondary" className="mt-1">
              {tutor.categories[0].name}
            </Badge>
          )}
        </div>
      </div>

      {/* Bio */}
      <p className="mt-4 text-sm text-muted-foreground line-clamp-3">
        {tutor.bio}
      </p>

      {/* Rating & Price */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">
            {tutor.rating.toFixed(1)}
          </span>
        </div>

        <span className="text-sm font-semibold">
          ৳{tutor.pricePerHr}
          <span className="text-muted-foreground"> /hr</span>
        </span>
      </div>

      {/* Categories */}
      <div className="mt-3 flex flex-wrap gap-2">
        {tutor.categories.map((cat: any) => (
          <Badge key={cat.id} variant="outline">
            {cat.name}
          </Badge>
        ))}
      </div>

      {/* CTA */}
      <Button
        className="mt-5 w-full transition group-hover:bg-primary"
        size="sm"
        onClick={() => router.push(`/tutors/${tutor.id}`)}
      >
        View Profile
      </Button>
    </div>
  );
}
