import { Star } from "lucide-react";
import { useState } from "react";

interface GameRatingProps {
  rating: number;
  onRate: (newRating: number) => void;
  size?: number;
  readOnly?: boolean;
}

export default function GameRating({
  rating,
  onRate,
  size = 32,
  readOnly = false,
}: GameRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const onRateHandler = (event:React.MouseEvent<SVGSVGElement, MouseEvent>, newRating: number) => {
    event.stopPropagation();
    if (!readOnly) {
      onRate(newRating);
    }
  };

  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, index) => {
        const starIndex = index + 1;
        return (
          <Star
            key={index}
            size={size}
            className={`cursor-pointer pr-2 ${
              starIndex <= (hovered ?? rating) ? "text-yellow-400 fill-yellow-300" : "text-gray-400"
            } ${readOnly ? "cursor-default" : ""}`}
            onMouseEnter={() => !readOnly && setHovered(starIndex)}
            onMouseLeave={() => !readOnly && setHovered(null)}
            onClick={(e) => !readOnly && onRateHandler(e, starIndex)}
          />
        );
      })}
    </div>
  );
}
