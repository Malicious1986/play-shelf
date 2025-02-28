import { Game } from "@/models/game";
import GameCard from "@/components/game";
import { useQuery } from "@apollo/client";
import { GET_GAMES } from "@/graphql/queries";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import NoGames from "@/components/noGames";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

const LIMIT = 8;

interface GameGridProps {
  className?: string;
}

export default function GameGrid({ className = "" }: GameGridProps) {
  const [games, setGames] = useState<Game[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();
  const filters = useSelector((state: RootState) => state.filters.filters);
  const { loading, data, fetchMore } = useQuery(GET_GAMES, {
    variables: {...filters, limit: LIMIT, offset: 0},
  });

  useEffect(() => {
    if (data?.games) {
      setGames(data.games.games);
      setHasMore(data.games.hasMore);
    }
  }, [data]);

  useEffect(() => {
    if (inView && hasMore) {
      console.log("fetching more games");
      fetchMore({
        variables: { limit: LIMIT, offset: games.length, ...filters },
      }).then(({ data }) => {
        if (data?.games?.games.length) {
          setGames((prev) => [...prev, ...data.games.games]);
          setHasMore(data.games.hasMore);
        }
      });
    }
  }, [inView, hasMore, games.length, fetchMore]);


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
          games?.length
            ? "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            : ""
        }  ${className}`}
      >
        {games?.length ? (
          games.map((game: Game, index: number) => (
            <GameCard key={index} {...game} />
          ))
        ) : (
          <div className="w-full flex flex-col items-center justify-center space-y-4">
            {filters["category"] === "All" ? (
              <NoGames />
            ) : (
              <p>No games with category {filters["category"]}</p>
            )}
          </div>
        )}
        <div ref={ref} className="h-10" />
      </div>
    </>
  );
}
