import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Upload: { input: any; output: any; }
};

export type AddGameInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  rating?: InputMaybe<Scalars['Float']['input']>;
};

export type AddGameResponse = MutationResponse & {
  __typename?: 'AddGameResponse';
  error?: Maybe<Scalars['String']['output']>;
  game?: Maybe<Game>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String']['output'];
  user: User;
};

export type AuthResponse = MutationResponse & {
  __typename?: 'AuthResponse';
  auth?: Maybe<AuthPayload>;
  error?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type BaseResponse = MutationResponse & {
  __typename?: 'BaseResponse';
  error?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type DeleteGameResponse = MutationResponse & {
  __typename?: 'DeleteGameResponse';
  error?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Game = {
  __typename?: 'Game';
  category?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  rating?: Maybe<Scalars['Float']['output']>;
};

export type GameListResponse = {
  __typename?: 'GameListResponse';
  games: Array<Game>;
  hasMore: Scalars['Boolean']['output'];
};

export type GenerateShareLinkResponse = MutationResponse & {
  __typename?: 'GenerateShareLinkResponse';
  error?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  shareLink?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addGame?: Maybe<AddGameResponse>;
  deleteGame: DeleteGameResponse;
  forgotPassword: BaseResponse;
  generateShareLink: GenerateShareLinkResponse;
  login: AuthResponse;
  register: AuthResponse;
  resetPassword: BaseResponse;
  updateGame?: Maybe<AddGameResponse>;
  uploadImage: UploadImageResponse;
};


export type MutationAddGameArgs = {
  addGameInput: AddGameInput;
};


export type MutationDeleteGameArgs = {
  id: Scalars['ID']['input'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationUpdateGameArgs = {
  updateGameInput: UpdateGameInput;
};


export type MutationUploadImageArgs = {
  file: Scalars['Upload']['input'];
};

export type MutationResponse = {
  error?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  game?: Maybe<Game>;
  games: GameListResponse;
  recommendedGamesAI: Array<RecommendedGame>;
  sharedGames: SharedGames;
};


export type QueryGameArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGamesArgs = {
  category?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  minRating?: InputMaybe<Scalars['Float']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySharedGamesArgs = {
  shareId: Scalars['ID']['input'];
};

export type RecommendedGame = {
  __typename?: 'RecommendedGame';
  category?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type SharedGames = {
  __typename?: 'SharedGames';
  games: Array<Game>;
  username: Scalars['String']['output'];
};

export type UpdateGameInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  rating?: InputMaybe<Scalars['Float']['input']>;
};

export type UploadImageResponse = MutationResponse & {
  __typename?: 'UploadImageResponse';
  error?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

type BaseResponseFragment_AddGameResponse_Fragment = { __typename?: 'AddGameResponse', success: boolean, message: string, error?: string | null };

type BaseResponseFragment_AuthResponse_Fragment = { __typename?: 'AuthResponse', success: boolean, message: string, error?: string | null };

type BaseResponseFragment_BaseResponse_Fragment = { __typename?: 'BaseResponse', success: boolean, message: string, error?: string | null };

type BaseResponseFragment_DeleteGameResponse_Fragment = { __typename?: 'DeleteGameResponse', success: boolean, message: string, error?: string | null };

type BaseResponseFragment_GenerateShareLinkResponse_Fragment = { __typename?: 'GenerateShareLinkResponse', success: boolean, message: string, error?: string | null };

type BaseResponseFragment_UploadImageResponse_Fragment = { __typename?: 'UploadImageResponse', success: boolean, message: string, error?: string | null };

export type BaseResponseFragmentFragment = BaseResponseFragment_AddGameResponse_Fragment | BaseResponseFragment_AuthResponse_Fragment | BaseResponseFragment_BaseResponse_Fragment | BaseResponseFragment_DeleteGameResponse_Fragment | BaseResponseFragment_GenerateShareLinkResponse_Fragment | BaseResponseFragment_UploadImageResponse_Fragment;

export type AddGameMutationVariables = Exact<{
  addGameInput: AddGameInput;
}>;


export type AddGameMutation = { __typename?: 'Mutation', addGame?: { __typename?: 'AddGameResponse', success: boolean, message: string, error?: string | null, game?: { __typename?: 'Game', id: string, name: string, description?: string | null, rating?: number | null, image?: string | null, category?: string | null } | null } | null };

export type DeleteGameMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteGameMutation = { __typename?: 'Mutation', deleteGame: { __typename?: 'DeleteGameResponse', id: string, success: boolean, message: string, error?: string | null } };

export type GenerateShareLinkMutationVariables = Exact<{ [key: string]: never; }>;


export type GenerateShareLinkMutation = { __typename?: 'Mutation', generateShareLink: { __typename?: 'GenerateShareLinkResponse', shareLink?: string | null, success: boolean, message: string, error?: string | null } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', success: boolean, message: string, error?: string | null, auth?: { __typename?: 'AuthPayload', token: string, user: { __typename?: 'User', id: string, name: string, email: string, avatar?: string | null } } | null } };

export type RegisterMutationVariables = Exact<{
  name: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthResponse', success: boolean, message: string, error?: string | null, auth?: { __typename?: 'AuthPayload', token: string, user: { __typename?: 'User', id: string, name: string, email: string } } | null } };

export type UpdateGameMutationVariables = Exact<{
  updateGameInput: UpdateGameInput;
}>;


export type UpdateGameMutation = { __typename?: 'Mutation', updateGame?: { __typename?: 'AddGameResponse', game?: { __typename?: 'Game', id: string, name: string, description?: string | null, rating?: number | null, image?: string | null, category?: string | null } | null } | null };

export type UpdateGameRateMutationVariables = Exact<{
  updateGameInput: UpdateGameInput;
}>;


export type UpdateGameRateMutation = { __typename?: 'Mutation', updateGame?: { __typename?: 'AddGameResponse', game?: { __typename?: 'Game', id: string, rating?: number | null } | null } | null };

export type UploadImageMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
}>;


export type UploadImageMutation = { __typename?: 'Mutation', uploadImage: { __typename?: 'UploadImageResponse', url?: string | null, success: boolean, message: string, error?: string | null } };

export type GetAiRecommendationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAiRecommendationsQuery = { __typename?: 'Query', recommendedGamesAI: Array<{ __typename?: 'RecommendedGame', name: string, description?: string | null, category?: string | null }> };

export type GetGameDetailsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetGameDetailsQuery = { __typename?: 'Query', game?: { __typename?: 'Game', id: string, name: string, description?: string | null, image?: string | null, category?: string | null, rating?: number | null } | null };

export type GetGamesQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  category?: InputMaybe<Scalars['String']['input']>;
  minRating?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetGamesQuery = { __typename?: 'Query', games: { __typename?: 'GameListResponse', hasMore: boolean, games: Array<{ __typename?: 'Game', id: string, name: string, description?: string | null, image?: string | null, rating?: number | null, category?: string | null }> } };

export type SharedGamesQueryVariables = Exact<{
  shareId: Scalars['ID']['input'];
}>;


export type SharedGamesQuery = { __typename?: 'Query', sharedGames: { __typename?: 'SharedGames', username: string, games: Array<{ __typename?: 'Game', id: string, name: string, description?: string | null, image?: string | null, category?: string | null, rating?: number | null }> } };

export const BaseResponseFragmentFragmentDoc = gql`
    fragment baseResponseFragment on MutationResponse {
  success
  message
  error
}
    `;
export const AddGameDocument = gql`
    mutation AddGame($addGameInput: AddGameInput!) {
  addGame(addGameInput: $addGameInput) {
    ...baseResponseFragment
    game {
      id
      name
      description
      rating
      image
      category
    }
  }
}
    ${BaseResponseFragmentFragmentDoc}`;
export type AddGameMutationFn = Apollo.MutationFunction<AddGameMutation, AddGameMutationVariables>;

/**
 * __useAddGameMutation__
 *
 * To run a mutation, you first call `useAddGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addGameMutation, { data, loading, error }] = useAddGameMutation({
 *   variables: {
 *      addGameInput: // value for 'addGameInput'
 *   },
 * });
 */
export function useAddGameMutation(baseOptions?: Apollo.MutationHookOptions<AddGameMutation, AddGameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddGameMutation, AddGameMutationVariables>(AddGameDocument, options);
      }
export type AddGameMutationHookResult = ReturnType<typeof useAddGameMutation>;
export type AddGameMutationResult = Apollo.MutationResult<AddGameMutation>;
export type AddGameMutationOptions = Apollo.BaseMutationOptions<AddGameMutation, AddGameMutationVariables>;
export const DeleteGameDocument = gql`
    mutation DeleteGame($id: ID!) {
  deleteGame(id: $id) {
    ...baseResponseFragment
    id
  }
}
    ${BaseResponseFragmentFragmentDoc}`;
export type DeleteGameMutationFn = Apollo.MutationFunction<DeleteGameMutation, DeleteGameMutationVariables>;

/**
 * __useDeleteGameMutation__
 *
 * To run a mutation, you first call `useDeleteGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteGameMutation, { data, loading, error }] = useDeleteGameMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteGameMutation(baseOptions?: Apollo.MutationHookOptions<DeleteGameMutation, DeleteGameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteGameMutation, DeleteGameMutationVariables>(DeleteGameDocument, options);
      }
export type DeleteGameMutationHookResult = ReturnType<typeof useDeleteGameMutation>;
export type DeleteGameMutationResult = Apollo.MutationResult<DeleteGameMutation>;
export type DeleteGameMutationOptions = Apollo.BaseMutationOptions<DeleteGameMutation, DeleteGameMutationVariables>;
export const GenerateShareLinkDocument = gql`
    mutation GenerateShareLink {
  generateShareLink {
    ...baseResponseFragment
    shareLink
  }
}
    ${BaseResponseFragmentFragmentDoc}`;
export type GenerateShareLinkMutationFn = Apollo.MutationFunction<GenerateShareLinkMutation, GenerateShareLinkMutationVariables>;

/**
 * __useGenerateShareLinkMutation__
 *
 * To run a mutation, you first call `useGenerateShareLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateShareLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateShareLinkMutation, { data, loading, error }] = useGenerateShareLinkMutation({
 *   variables: {
 *   },
 * });
 */
export function useGenerateShareLinkMutation(baseOptions?: Apollo.MutationHookOptions<GenerateShareLinkMutation, GenerateShareLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateShareLinkMutation, GenerateShareLinkMutationVariables>(GenerateShareLinkDocument, options);
      }
export type GenerateShareLinkMutationHookResult = ReturnType<typeof useGenerateShareLinkMutation>;
export type GenerateShareLinkMutationResult = Apollo.MutationResult<GenerateShareLinkMutation>;
export type GenerateShareLinkMutationOptions = Apollo.BaseMutationOptions<GenerateShareLinkMutation, GenerateShareLinkMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    ...baseResponseFragment
    auth {
      token
      user {
        id
        name
        email
        avatar
      }
    }
  }
}
    ${BaseResponseFragmentFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($name: String!, $email: String!, $password: String!) {
  register(name: $name, email: $email, password: $password) {
    ...baseResponseFragment
    auth {
      token
      user {
        id
        name
        email
      }
    }
  }
}
    ${BaseResponseFragmentFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UpdateGameDocument = gql`
    mutation UpdateGame($updateGameInput: UpdateGameInput!) {
  updateGame(updateGameInput: $updateGameInput) {
    game {
      id
      name
      description
      rating
      image
      category
    }
  }
}
    `;
export type UpdateGameMutationFn = Apollo.MutationFunction<UpdateGameMutation, UpdateGameMutationVariables>;

/**
 * __useUpdateGameMutation__
 *
 * To run a mutation, you first call `useUpdateGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGameMutation, { data, loading, error }] = useUpdateGameMutation({
 *   variables: {
 *      updateGameInput: // value for 'updateGameInput'
 *   },
 * });
 */
export function useUpdateGameMutation(baseOptions?: Apollo.MutationHookOptions<UpdateGameMutation, UpdateGameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateGameMutation, UpdateGameMutationVariables>(UpdateGameDocument, options);
      }
export type UpdateGameMutationHookResult = ReturnType<typeof useUpdateGameMutation>;
export type UpdateGameMutationResult = Apollo.MutationResult<UpdateGameMutation>;
export type UpdateGameMutationOptions = Apollo.BaseMutationOptions<UpdateGameMutation, UpdateGameMutationVariables>;
export const UpdateGameRateDocument = gql`
    mutation UpdateGameRate($updateGameInput: UpdateGameInput!) {
  updateGame(updateGameInput: $updateGameInput) {
    game {
      id
      rating
    }
  }
}
    `;
export type UpdateGameRateMutationFn = Apollo.MutationFunction<UpdateGameRateMutation, UpdateGameRateMutationVariables>;

/**
 * __useUpdateGameRateMutation__
 *
 * To run a mutation, you first call `useUpdateGameRateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGameRateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGameRateMutation, { data, loading, error }] = useUpdateGameRateMutation({
 *   variables: {
 *      updateGameInput: // value for 'updateGameInput'
 *   },
 * });
 */
export function useUpdateGameRateMutation(baseOptions?: Apollo.MutationHookOptions<UpdateGameRateMutation, UpdateGameRateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateGameRateMutation, UpdateGameRateMutationVariables>(UpdateGameRateDocument, options);
      }
export type UpdateGameRateMutationHookResult = ReturnType<typeof useUpdateGameRateMutation>;
export type UpdateGameRateMutationResult = Apollo.MutationResult<UpdateGameRateMutation>;
export type UpdateGameRateMutationOptions = Apollo.BaseMutationOptions<UpdateGameRateMutation, UpdateGameRateMutationVariables>;
export const UploadImageDocument = gql`
    mutation UploadImage($file: Upload!) {
  uploadImage(file: $file) {
    ...baseResponseFragment
    url
  }
}
    ${BaseResponseFragmentFragmentDoc}`;
export type UploadImageMutationFn = Apollo.MutationFunction<UploadImageMutation, UploadImageMutationVariables>;

/**
 * __useUploadImageMutation__
 *
 * To run a mutation, you first call `useUploadImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadImageMutation, { data, loading, error }] = useUploadImageMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadImageMutation(baseOptions?: Apollo.MutationHookOptions<UploadImageMutation, UploadImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadImageMutation, UploadImageMutationVariables>(UploadImageDocument, options);
      }
export type UploadImageMutationHookResult = ReturnType<typeof useUploadImageMutation>;
export type UploadImageMutationResult = Apollo.MutationResult<UploadImageMutation>;
export type UploadImageMutationOptions = Apollo.BaseMutationOptions<UploadImageMutation, UploadImageMutationVariables>;
export const GetAiRecommendationsDocument = gql`
    query GetAIRecommendations {
  recommendedGamesAI {
    name
    description
    category
  }
}
    `;

/**
 * __useGetAiRecommendationsQuery__
 *
 * To run a query within a React component, call `useGetAiRecommendationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAiRecommendationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAiRecommendationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAiRecommendationsQuery(baseOptions?: Apollo.QueryHookOptions<GetAiRecommendationsQuery, GetAiRecommendationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAiRecommendationsQuery, GetAiRecommendationsQueryVariables>(GetAiRecommendationsDocument, options);
      }
export function useGetAiRecommendationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAiRecommendationsQuery, GetAiRecommendationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAiRecommendationsQuery, GetAiRecommendationsQueryVariables>(GetAiRecommendationsDocument, options);
        }
export function useGetAiRecommendationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAiRecommendationsQuery, GetAiRecommendationsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAiRecommendationsQuery, GetAiRecommendationsQueryVariables>(GetAiRecommendationsDocument, options);
        }
export type GetAiRecommendationsQueryHookResult = ReturnType<typeof useGetAiRecommendationsQuery>;
export type GetAiRecommendationsLazyQueryHookResult = ReturnType<typeof useGetAiRecommendationsLazyQuery>;
export type GetAiRecommendationsSuspenseQueryHookResult = ReturnType<typeof useGetAiRecommendationsSuspenseQuery>;
export type GetAiRecommendationsQueryResult = Apollo.QueryResult<GetAiRecommendationsQuery, GetAiRecommendationsQueryVariables>;
export const GetGameDetailsDocument = gql`
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

/**
 * __useGetGameDetailsQuery__
 *
 * To run a query within a React component, call `useGetGameDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGameDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGameDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetGameDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetGameDetailsQuery, GetGameDetailsQueryVariables> & ({ variables: GetGameDetailsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGameDetailsQuery, GetGameDetailsQueryVariables>(GetGameDetailsDocument, options);
      }
export function useGetGameDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGameDetailsQuery, GetGameDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGameDetailsQuery, GetGameDetailsQueryVariables>(GetGameDetailsDocument, options);
        }
export function useGetGameDetailsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetGameDetailsQuery, GetGameDetailsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetGameDetailsQuery, GetGameDetailsQueryVariables>(GetGameDetailsDocument, options);
        }
export type GetGameDetailsQueryHookResult = ReturnType<typeof useGetGameDetailsQuery>;
export type GetGameDetailsLazyQueryHookResult = ReturnType<typeof useGetGameDetailsLazyQuery>;
export type GetGameDetailsSuspenseQueryHookResult = ReturnType<typeof useGetGameDetailsSuspenseQuery>;
export type GetGameDetailsQueryResult = Apollo.QueryResult<GetGameDetailsQuery, GetGameDetailsQueryVariables>;
export const GetGamesDocument = gql`
    query GetGames($limit: Int!, $offset: Int!, $category: String, $minRating: Float) {
  games(
    limit: $limit
    offset: $offset
    category: $category
    minRating: $minRating
  ) {
    games {
      id
      name
      description
      image
      rating
      category
    }
    hasMore
  }
}
    `;

/**
 * __useGetGamesQuery__
 *
 * To run a query within a React component, call `useGetGamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGamesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      category: // value for 'category'
 *      minRating: // value for 'minRating'
 *   },
 * });
 */
export function useGetGamesQuery(baseOptions: Apollo.QueryHookOptions<GetGamesQuery, GetGamesQueryVariables> & ({ variables: GetGamesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGamesQuery, GetGamesQueryVariables>(GetGamesDocument, options);
      }
export function useGetGamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGamesQuery, GetGamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGamesQuery, GetGamesQueryVariables>(GetGamesDocument, options);
        }
export function useGetGamesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetGamesQuery, GetGamesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetGamesQuery, GetGamesQueryVariables>(GetGamesDocument, options);
        }
export type GetGamesQueryHookResult = ReturnType<typeof useGetGamesQuery>;
export type GetGamesLazyQueryHookResult = ReturnType<typeof useGetGamesLazyQuery>;
export type GetGamesSuspenseQueryHookResult = ReturnType<typeof useGetGamesSuspenseQuery>;
export type GetGamesQueryResult = Apollo.QueryResult<GetGamesQuery, GetGamesQueryVariables>;
export const SharedGamesDocument = gql`
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

/**
 * __useSharedGamesQuery__
 *
 * To run a query within a React component, call `useSharedGamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSharedGamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSharedGamesQuery({
 *   variables: {
 *      shareId: // value for 'shareId'
 *   },
 * });
 */
export function useSharedGamesQuery(baseOptions: Apollo.QueryHookOptions<SharedGamesQuery, SharedGamesQueryVariables> & ({ variables: SharedGamesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SharedGamesQuery, SharedGamesQueryVariables>(SharedGamesDocument, options);
      }
export function useSharedGamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SharedGamesQuery, SharedGamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SharedGamesQuery, SharedGamesQueryVariables>(SharedGamesDocument, options);
        }
export function useSharedGamesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SharedGamesQuery, SharedGamesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SharedGamesQuery, SharedGamesQueryVariables>(SharedGamesDocument, options);
        }
export type SharedGamesQueryHookResult = ReturnType<typeof useSharedGamesQuery>;
export type SharedGamesLazyQueryHookResult = ReturnType<typeof useSharedGamesLazyQuery>;
export type SharedGamesSuspenseQueryHookResult = ReturnType<typeof useSharedGamesSuspenseQuery>;
export type SharedGamesQueryResult = Apollo.QueryResult<SharedGamesQuery, SharedGamesQueryVariables>;