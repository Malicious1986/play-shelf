import GameGrid from "@/components/grid";
import { AddGameDialog } from "./addGameDialog";
import GameFilters from "./gameFilters";

export default function GameCollection() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🎲 My Game Collection</h1>
      <div className="flex justify-between mb-6">
        <GameFilters />
        <AddGameDialog />
      </div>
      <GameGrid />
    </div>
  );
}
