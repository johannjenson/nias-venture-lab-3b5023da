
import React from "react";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeatRatingProps {
  currentRating: number;
  onRatingChange: (rating: number) => void;
}

const HeatRating = ({ currentRating, onRatingChange }: HeatRatingProps) => {
  return (
    <div>
      <h4 className="font-medium mb-2">Lead Heat Rating</h4>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            onClick={() => onRatingChange(rating === currentRating ? 0 : rating)}
            className="hover:scale-110 transition-transform"
          >
            <Flame 
              className={cn(
                "w-6 h-6",
                rating <= currentRating ? "text-red-500" : "text-gray-300"
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeatRating;
