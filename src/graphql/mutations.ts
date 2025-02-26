import { gql } from "@apollo/client";


export const ADD_GAME = gql`
  mutation AddGame($addGameInput: AddGameInput!) {
    addGame(addGameInput: $addGameInput) {
        name
        description
        rating
        image
        category
    }
}`;

export const UPDATE_GAME = gql`
  mutation UpdateGame($updateGameInput: UpdateGameInput!) {
    updateGame(updateGameInput: $updateGameInput) {
      id
      name
      description
      rating
      image
      category
    }
  }
`;

export const UPDATE_GAME_RATE = gql`
    mutation UpdateGameRate($updateGameInput: UpdateGameInput!) {
        updateGame(updateGameInput:$updateGameInput) {
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

export const UPLOAD_IMAGE = gql`
  mutation UploadImage($file: Upload!) {
    uploadImage(file: $file)
  }
`;

export const GENERATE_SHARE_LINK = gql`
  mutation GenerateShareLink {
    generateShareLink
  }
`;
