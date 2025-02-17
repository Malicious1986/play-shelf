import { gql } from "@apollo/client";

export const ADD_GAME = gql`
  mutation AddGame($name: String!, $description: String, $rating: Float, $image: String, $category: String) {
    addGame(name: $name, description: $description, rating: $rating, image: $image, category: $category) {
        name
        description
        rating
        image
        category
    }
}`;

export const UPDATE_GAME_RATE = gql`
    mutation UpdateGameRate($id: ID!, $rating: Float!) {
        updateGame(id: $id, rating: $rating) {
            id
            rating
        }
    }
`;

export const DELETE_GAME = gql`
    mutation DeleteGame($id: ID!) {
        deleteGame(id: $id)
    }
`;