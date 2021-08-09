import { Button } from '@frontend/components/ui/controls'
import { FieldContainer, TextInput } from '@frontend/components/ui/forms'
import { Container } from '@frontend/components/ui/layout'
import { Form, Formik } from 'formik'
import { gql, request } from 'graphql-request'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from 'react-query'
import * as Yup from 'yup'

export type SignUpArgs = { name: string; email: string; password: string }

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be 2 characters or more')
    .max(36, 'Name can not be longer than 36 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email address is required'),
  password: Yup.string()
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character'
    )
    .required('Password is required'),
})

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
      <h1>Sign Up</h1>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false)
          signup(values)
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FieldContainer>
              <TextInput
                size="large"
                label="Name"
                type="text"
                name="name"
                id="name"
              />
            </FieldContainer>
            <FieldContainer>
              <TextInput
                size="large"
                label="Email"
                type="email"
                name="email"
                id="email"
              />
            </FieldContainer>
            <FieldContainer>
              <TextInput
                size="large"
                label="Password"
                type="password"
                name="password"
                id="password"
              />
            </FieldContainer>

            <Button
              type="submit"
              disabled={isSubmitting}
              appearance="primary"
              size="large"
            >
              Join{' '}
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default SignupPage
