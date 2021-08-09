import { SignInArgs, useAuth } from '@frontend/components/auth'
import { Button } from '@frontend/components/ui/controls'
import { FieldContainer, TextInput } from '@frontend/components/ui/forms'
import { Container } from '@frontend/components/ui/layout'
import { Form, Formik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'

const SignInPage = () => {
  const auth = useAuth()
  const router = useRouter()

  const signIn = async ({ email, password }: SignInArgs) => {
    if (!auth.ready) {
      return <div>Loading...</div>
    }
    const result = await auth.signIn({ email, password })
    console.log(result)
    if (result.success) {
      router.push('/')
    }
  }

  return (
    <Container>
      <h1>Sign In</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values)
          signIn(values)
          setSubmitting(false)
        }}
      >
        {({ isSubmitting }) => (
          <Form>
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
            <div>
              <Button
                type="submit"
                disabled={isSubmitting}
                appearance="primary"
                size="large"
              >
                Sign in{' '}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="my-4">
        <Link href="/signup">Want to join instead?</Link>
      </div>
    </Container>
  )
}

export default SignInPage
