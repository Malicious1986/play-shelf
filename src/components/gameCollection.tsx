import GameGrid from "@/components/grid";
import { fetchGames } from "@/store/slices/gameSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddGameDialog } from "./addGameDialog";

export default function GameCollection() {
  const dispatch = useDispatch<AppDispatch>();
  const games = useSelector((state: RootState) => state.game.games);

  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🎲 My Game Collection
      </h1>
      <div className="flex justify-end mb-6">
        <AddGameDialog />
      </div>
      <GameGrid games={games} />
    </div>
  );
}
