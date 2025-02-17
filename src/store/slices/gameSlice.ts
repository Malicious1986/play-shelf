import { Game } from "@/models/game";
import { createSlice } from "@reduxjs/toolkit";

interface GameState {
  games: Game[];
}
const initialState: GameState = {
  games: [],
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {

  },
});

export default gameSlice.reducer;
