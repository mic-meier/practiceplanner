import { SignInArgs, useAuth } from '@frontend/components/auth'
import { Button } from '@frontend/components/ui/controls'
import { FieldContainer, TextInput } from '@frontend/components/ui/forms'
import { FormContainer } from '@frontend/components/ui/layout'
import { Form, Formik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { SetStateAction, useState } from 'react'

const SignInPage = () => {
  const [signInError, setSignInError] =
    useState<SetStateAction<null | string>>(null)
  const auth = useAuth()
  const router = useRouter()

  const signIn = async ({ email, password }: SignInArgs) => {
    if (!auth.ready) {
      return <div>Loading...</div>
    }
    const result = await auth.signIn({ email, password })
    if (result.success) {
      router.push('/profile')
    } else setSignInError('No user with these credentials.')
  }

  return (
    <FormContainer>
      <h1 className="text-2xl font-semibold">Sign In</h1>
      <div className="pt-4">
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values, { setSubmitting }) => {
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
              {signInError ? (
                <div className="my-4 text-red-500 ">{signInError}</div>
              ) : null}
              <div className="pt-4 flex items-end">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  appearance="primary"
                  size="large"
                >
                  Sign in{' '}
                </Button>
                <Link href="/signup">
                  <a className="ml-auto text-gray-500">Want to join instead?</a>
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </FormContainer>
  )
}

export default SignInPage
