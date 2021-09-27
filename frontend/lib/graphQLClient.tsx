import { GraphQLClient } from 'graphql-request'

export const graphQLClient = new GraphQLClient(
  typeof window === undefined
    ? 'http://localhost:8001/api/graphql'
    : '/api/graphql'
)
