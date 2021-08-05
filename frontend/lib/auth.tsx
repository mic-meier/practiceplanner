import { gql, request } from 'graphql-request'
import { createContext, ReactNode, useContext, useEffect, useRef } from 'react'
import { useMutation, useQuery } from 'react-query'

/*
From https://github.com/keystonejs/prisma-day-2021-workshop/blob/main/components/auth.tsx
adapted to react-query with graphql-request
*/

export type SignInArgs = { email: string; password: string }
export type SignInResult =
  | { success: true }
  | { success: false; message: string }

type AuthContextType =
  | {
      ready?: true
      sessionData?: { id: string; name: string }
      signIn: ({ email, password }: SignInArgs) => Promise<SignInResult>
      signOut: () => void
    }
  | {
      ready: false
    }

const AuthContext = createContext<AuthContextType>({
  ready: false,
})

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const wasReady = useRef(false)
  const endpoint = process.env.API_URL || 'http://localhost:3000/api/graphql'

  const {
    data: sessionData,
    isLoading,
    error: sessionError,
  } = useQuery('authenticated-user', async () => {
    const data = await request(
      endpoint,
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
    console.log('Data from authenticated-user request: ', data)
    return data
  })

  const { mutateAsync: authenticate } = useMutation(
    async ({ email, password }: SignInArgs) => {
      const data = await request(
        endpoint,
        gql`
          mutation ($email: String!, $password: String!) {
            authenticateUserWithPassword(email: $email, password: $password) {
              __typename
              ... on UserAuthenticationWithPasswordSuccess {
                item {
                  id
                }
              }
              ... on UserAuthenticationWithPasswordFailure {
                message
              }
            }
          }
        `,
        { email, password }
      )
      return data
    }
  )

  const signIn = async ({
    email,
    password,
  }: SignInArgs): Promise<SignInResult> => {
    const data = await authenticate({ email, password })

    if (
      data?.authenticateUserWithPassword?.__typename ===
      'UserAuthenticationWithPasswordSuccess'
    ) {
      return { success: true }
    } else if (
      data?.authenticateUserWithPassword?.__typename ===
      'UserAuthenticationWithPasswordFailure'
    ) {
      return {
        success: false,
        message: data.authenticateUserWithPassword?.message,
      }
    }
    return { success: false, message: 'An unknown error occurred' }
  }

  const { mutate: signOutMutation } = useMutation(async () => {
    await request(
      endpoint,
      gql`
        mutation {
          endSession
        }
      `
    )
  })

  const signOut = () => {
    signOutMutation()
  }

  useEffect(() => {
    if (!wasReady.current && !isLoading && !sessionError) {
      wasReady.current = true
    }
  })

  return (
    <AuthContext.Provider
      value={{
        ready: wasReady.current || !isLoading,
        sessionData: sessionData?.authenticatedItem,
        signOut,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
