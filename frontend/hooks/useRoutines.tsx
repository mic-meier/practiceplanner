import { graphQLClient } from '@frontend/lib/graphQLClient'
import { gql } from 'graphql-request'
import { useQuery } from 'react-query'

export const useRoutines = () =>
  useQuery('routines', async () => {
    const data = await graphQLClient.request(
      gql`
        query {
          authenticatedItem {
            ... on User {
              routines {
                id
                name
                description
                notes
                createdAt
                updatedAt
                exercisesCount
              }
            }
          }
        }
      `
    )
    return data.authenticatedItem.routines
  })
