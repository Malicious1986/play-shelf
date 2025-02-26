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

export const GET_GAME_DETAILS = gql`
  query GetGameDetails($id: ID!) {
    game(id: $id) {
      id
      name
      description
      image
      category
      rating
    }
  }
`;

export const GET_SHARED_GAMES = gql`
  query SharedGames($shareId: ID!) {
    sharedGames(shareId: $shareId) {
      username
      games {
        id
        name
        description
        image
        category
        rating
      }
    }
  }
`;
