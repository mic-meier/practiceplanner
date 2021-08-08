import { Button } from '@frontend/components/ui/controls'
import {
  FieldContainer,
  FieldLabel,
  TextInput,
} from '@frontend/components/ui/forms'
import { Container } from '@frontend/components/ui/layout'
import { Formik } from 'formik'
import { gql, request } from 'graphql-request'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from 'react-query'

export type SignUpArgs = { name: string; email: string; password: string }

const SignupPage = () => {
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
        router.push('/')
      },
    }
  )

  return (
    <Container>
      <h1>Sign In</h1>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false)
          signup(values)
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <FieldContainer htmlFor="name">
              <FieldLabel>Email</FieldLabel>
              <TextInput
                type="text"
                name="name"
                size="large"
                id="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              {errors.email && touched.email && errors.email}
            </FieldContainer>
            <FieldContainer htmlFor="email">
              <FieldLabel>Email</FieldLabel>
              <TextInput
                type="email"
                name="email"
                size="large"
                id="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && errors.email}
            </FieldContainer>
            <FieldContainer htmlFor="password">
              <FieldLabel>Password</FieldLabel>
              <TextInput
                type="password"
                name="password"
                id="password"
                size="large"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && errors.password}
            </FieldContainer>
            <Button
              type="submit"
              disabled={isSubmitting}
              appearance="primary"
              size="large"
            >
              Sign in{' '}
            </Button>
          </form>
        )}
      </Formik>
    </Container>
  )
}

export default SignupPage
