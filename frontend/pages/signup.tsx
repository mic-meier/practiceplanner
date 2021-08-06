import { gql, request } from 'graphql-request'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

export type SignUpArgs = { name: string; email: string; password: string }

const SignupPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const queryClient = useQueryClient()
  const router = useRouter()

  const { mutateAsync: signup } = useMutation(
    async ({ name, email, password }: SignUpArgs) => {
      const data = await request(
        typeof window === undefined
          ? 'http://localhost:8001/api/graphql'
          : '/api/graphql',
        gql`
          mutation ($name: String!, $email: String!, $password: String!) {
            createUser(
              data: { name: $name, email: $email, password: $password }
            ) {
              __typename
              id
            }
            authenticateUserWithPassword(email: $email, password: $password) {
              __typename
            }
          }
        `,
        { name, email, password }
      )
      return data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user')
      },
    }
  )

  return (
    <div>
      <h1>Sign Up</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          signup({ name, email, password })
          router.push('/')
        }}
      >
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value)
            }}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
            }}
          />
        </div>
        <div>
          <label htmlFor="name">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value)
            }}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default SignupPage
