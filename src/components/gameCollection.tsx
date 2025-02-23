import GameGrid from "@/components/grid";
import { AddGameDialog } from "./addGameDialog";
import { useQuery } from "@apollo/client";
import { GET_GAMES } from "@/graphql/queris";

export default function GameCollection() {
  const { loading, data } = useQuery(GET_GAMES);
  if (loading) return <p>Loading ...</p>;
  return (
    <div className="container mx-auto p-6">
      <h1 className="hidden md:block text-3xl font-bold mb-6 text-center">
        🎲 My Game Collection
      </h1>
      <div className="flex justify-end mb-6">
        <AddGameDialog />
      </div>
      <GameGrid games={data.games} />
    </div>
  );
}
