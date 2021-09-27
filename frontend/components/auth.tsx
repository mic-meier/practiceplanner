import { useAuthenticatedUser } from '@frontend/hooks/useAuthenticatedUser'
import { graphQLClient } from '@frontend/lib/graphQLClient'
import { gql } from 'graphql-request'
import router from 'next/router'
import { createContext, ReactNode, useContext, useEffect, useRef } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

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
      user?: { id: string; name: string }
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
  const queryClient = useQueryClient()
  const wasReady = useRef(false)

  const { data: user, isLoading, error: sessionError } = useAuthenticatedUser()

  const { mutateAsync: authenticate } = useMutation(
    async ({ email, password }: SignInArgs) => {
      const data = await graphQLClient.request(
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
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('authenticatedUser')
      },
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

  const { mutate: signOutMutation } = useMutation(
    async () => {
      await graphQLClient.request(
        gql`
          mutation {
            endSession
          }
        `
      )
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('authenticatedUser')
      },
    }
  )

  const signOut = () => {
    signOutMutation()
    router.push('/')
  }

  useEffect(() => {
    if (!wasReady.current && !isLoading && !sessionError) {
      wasReady.current = true
    }
  })

  return (
    <AuthContext.Provider
      value={{
        user: user?.authenticatedItem,
        ready: wasReady.current || !isLoading,
        signOut,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
