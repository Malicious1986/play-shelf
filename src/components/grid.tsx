import { Game } from "@/models/game";
import GameCard from "@/components/game";

interface GameGridProps {
  games: Game[];
  className?: string;
}

export default function GameGrid({ games, className }: GameGridProps) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ${className}`}
    >
      {games.map((game, index) => (
        <GameCard key={index} {...game} />
      ))}
      
    </div>
  );
}
