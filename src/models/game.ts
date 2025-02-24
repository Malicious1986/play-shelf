export interface Game {
  id: string;
  name: string;
  description: string;
  rating: number;
  image: string;
  category: string;
}

export const boardGameCategories = [
  "All",
  "Abstract",
  "Area Control",
  "Bluffing",
  "Card Games",
  "Cooperative",
  "Deck-Building",
  "Dexterity",
  "Dice Games",
  "Eurogame",
  "Family",
  "Legacy",
  "Party",
  "Role-Playing",
  "Social Deduction",
  "Strategy",
  "Tile Placement",
  "Trivia",
  "War Games",
  "Worker Placement",
  "Word Games",
];
