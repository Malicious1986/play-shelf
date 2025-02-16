import { Game } from "@/models/game";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface GameState {
  games: Game[];
}
const initialState: GameState = {
  games: [],
};

const API_URL = "http://localhost:3000/games";

export const fetchGames = createAsyncThunk("games/fetchGames", async () => {
  const response = await axios.get<Game[]>(API_URL);
  return response.data;
});

export const addGameAsync = createAsyncThunk(
  "games/addGame",
  async (game: Game) => {
    const response = await axios.post<Game>(
      API_URL,
      game
    );
    return response.data;
  }
);

export const updateGameRate = createAsyncThunk(
  "games/updateGameRate",
  async ({id, rating}: {id: string, rating: number}) => {
    const response = await axios.patch<Game>(
      `${API_URL}/${id}`,
      {rating}
    );
    return response.data;
  }
);

export const deleteGameAsync = createAsyncThunk(
  "games/deleteGame",
  async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.games = action.payload;
      })
      .addCase(addGameAsync.fulfilled, (state, action) => {
        state.games.push(action.payload);
      }).addCase(updateGameRate.fulfilled, (state, action) => {
        const game = state.games.find((game) => game.id === action.payload.id);
        if (game) {
          game.rating = action.payload.rating;
        } else {
          throw new Error("Game not found");
        }
      }).addCase(deleteGameAsync.fulfilled, (state, action) => {
        state.games = state.games.filter((game) => game.id !== action.payload);
      });
  },
});

export default gameSlice.reducer;
