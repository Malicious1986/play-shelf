import { useParams } from "react-router-dom";

import GameCard from "@/components/game";
import NoGames from "@/components/noGames";
import { Game, useSharedGamesQuery } from "@/graphql/types";

export default function SharedGames() {
  const { shareId } = useParams<{ shareId: string }>() s;

  const { loading, data, error } = useSharedGamesQuery({
    variables: { shareId: shareId || "" },
  });

  if (loading) return <p>Loading shared games...</p>;
  if (error) return <p>Error loading shared games.</p>;
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {data?.sharedGames.username
          ? `${data.sharedGames.username}'s Games`
          : "Shared Games"}
      </h1>

      <div
        className={`grid grid-cols-1 ${
          data?.sharedGames.games?.length
            ? "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            : ""
        } `}
      >
        {data?.sharedGames.games?.length ? (
          data.sharedGames.games.map((game: Game, index: number) => (
            <GameCard key={index} game={game} />
          ))
        ) : (
          <NoGames />
        )}
      </div>
    </div>
  );
}
