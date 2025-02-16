export interface Game {
    id: string;
    name: string;
    description: string;
    rating: number;
    image: string;
    category: string;
}

export const boardGameCategories = [
    'None',
    "Strategy",
    "Deck-Building",
    "Cooperative",
    "Party",
    "Abstract",
    "Worker Placement",
    "Area Control",
    "Role-Playing",
    "Card Games",
    "Tile Placement",
    "Dice Games",
    "War Games",
    "Family",
    "Trivia",
    "Dexterity",
    "Legacy",
    "Eurogame",
    "Bluffing",
    "Social Deduction",
    "Word Games"
  ];