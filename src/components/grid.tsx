import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import EditGameDialog from "@/components/editGameDialog";
import GameCard from "@/components/game";
import NoGames from "@/components/noGames";
import {
  Game,
  useDeleteGameMutation,
  useGetGamesQuery,
  useUpdateGameMutation,
} from "@/graphql/types";
import { RootState } from "@/store/store";

const LIMIT = 8;

interface GameGridProps {
  className?: string;
  games?: Game[];
}

export default function GameGrid({ className = "" }: GameGridProps) {
  const navigate = useNavigate();
  const [games, setGames] = useState<Game[]>([]);
  const [currentGame, setCurrentGame] = useState<Game | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();
  const filters = useSelector((state: RootState) => state.filters.filters);
  const [editOpen, setEditOpen] = useState(false);
  const [updateRate] = useUpdateGameMutation();
  const [deleteGame] = useDeleteGameMutation({
    update(cache, { data }) {
      if (!data?.deleteGame) return;

      cache.modify({
        fields: {
          games(existingGamesRefs = {}, { readField }) {
            const filteredGames = existingGamesRefs.games.filter(
              (gameRef: any) => {
                return (
                  data?.deleteGame.id.toString() !== readField("id", gameRef)
                );
              }
            );

            return {
              ...existingGamesRefs,
              games: filteredGames,
            };
          },
        },
      });
    },
  });

  const { loading, data, fetchMore } = useGetGamesQuery({
    variables: { ...filters, limit: LIMIT, offset: 0 },
  });

  useEffect(() => {
    if (data?.games) {
      setGames(data.games.games);
      setHasMore(data.games.hasMore);
    }
  }, [data]);

  useEffect(() => {
    if (inView && hasMore) {
      fetchMore({
        variables: {
          limit: LIMIT,
          offset: games.length % LIMIT ? LIMIT : games.length,
          ...filters,
        },
      }).then(({ data }) => {
        if (data?.games?.games.length) {
          setGames((prev) => [...prev, ...data.games.games]);
          setHasMore(data.games.hasMore);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasMore]);

  if (loading)
    return (
      <div className="w-full flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin w-16 h-16 text-white" />
        <p className="text-lg text-white">Loading your games...</p>
      </div>
    );

  const onEditHandler = (game: Game) => {
    setCurrentGame(game);
    setEditOpen(true);
  };

  const onUpdateRateHandler = async ({
    id,
    rate,
  }: {
    id: string;
    rate: number;
  }) => {
    await updateRate({
      variables: {
        updateGameInput: {
          id,
          rating: rate,
        },
      },
    });
  };

  const handleDeleteHandler = async (id: string) => {
    await deleteGame({ variables: { id } });
  };

  const onCardClickHandler = (id: string) => {
    navigate(`/games/${id}`);
  };
  return (
    <>
      <div
        className={`grid grid-cols-1 ${
          games?.length ? " md:grid-cols-3 lg:grid-cols-4 gap-6" : ""
        }  ${className}`}
      >
        {games?.length ? (
          games.map((game: Game, index: number) => (
            <GameCard
              key={index}
              game={game}
              onEdit={onEditHandler}
              onUpdateRate={onUpdateRateHandler}
              onDelete={handleDeleteHandler}
              onCardClick={onCardClickHandler}
            />
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
      {currentGame && editOpen ? (
        <EditGameDialog
          game={currentGame}
          open={editOpen}
          onClose={() => setEditOpen(false)}
        />
      ) : null}
    </>
  );
}
