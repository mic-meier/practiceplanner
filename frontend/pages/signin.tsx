import { SignInArgs, useAuth } from '@frontend/components/auth'
import { Button } from '@frontend/components/ui/controls'
import {
  FieldContainer,
  FieldLabel,
  TextInput,
} from '@frontend/components/ui/forms'
import { Container } from '@frontend/components/ui/layout'
import { Formik } from 'formik'
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
          signIn(values)
          setSubmitting(false)
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
      <div className="my-4">
        <Link href="/signup">Want to join instead?</Link>
      </div>
    </Container>
  )
}

export default SignInPage
