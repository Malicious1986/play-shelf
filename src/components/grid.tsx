import { Game } from "@/models/game";
import GameCard from "@/components/game";
import { useQuery } from "@apollo/client";
import { GET_GAMES } from "@/graphql/queries";
import { Loader2, Dices } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface GameGridProps {
  className?: string;
}

const NoGames = () => (
  <div className="w-full flex flex-col items-center justify-center space-y-4">
  <Dices className="w-32 h-32 text-gray-600" />
  <p className="text-3xl text-gray-600">No games added yet...</p>
</div>
);

export default function GameGrid({ className = "" }: GameGridProps) {
  const filters = useSelector((state: RootState) => state.filters.filters);
  const { loading, data } = useQuery(GET_GAMES, {
    variables: filters,
  });

  if (loading)
    return (
      <div className="w-full flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin w-16 h-16 text-white" />
        <p className="text-lg text-white">Loading your games...</p>
      </div>
    );
  return (
    <>
      <div
        className={`grid grid-cols-1 ${
          data?.games?.length
            ? "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            : ""
        }  ${className}`}
      >
        {data?.games?.length ? (
          data.games.map((game: Game, index: number) => (
            <GameCard key={index} {...game} />
          ))
        ) : (
          <div className="w-full flex flex-col items-center justify-center space-y-4">
            <p className="text-lg text-gray-600">
              {filters["category"] === "All"
                ? <NoGames />
                : `No games with category ${filters["category"]}`}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
