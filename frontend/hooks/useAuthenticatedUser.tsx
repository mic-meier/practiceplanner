import { graphQLClient } from '@frontend/lib/graphQLClient'
import { gql } from 'graphql-request'
import { useQuery } from 'react-query'

export const useAuthenticatedUser = () =>
  useQuery('authenticatedUser', async () => {
    const data = await graphQLClient.request(
      gql`
        query {
          authenticatedItem {
            ... on User {
              id
              name
            }
          }
        }
      `
    )
    return data.authenticatedItem
  })
