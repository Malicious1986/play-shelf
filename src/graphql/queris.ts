import { gql } from "@apollo/client";

export const GET_GAMES = gql`
  query GetGames {
    games {
      id
      name
      description
      image
      category
      rating
    }
  }
`;
