import { gql } from "@apollo/client";

export const GET_GAMES = gql`
  query GetGames($category: String, $minRating: Float) {
    games(category: $category, minRating: $minRating) {
      id
      name
      description
      image
      rating
      category
    }
  }
`;
