import { useAuth } from '@frontend/lib/auth'
import { useRouter } from 'next/router'
import { useState } from 'react'

const SignInPage = () => {
  const auth = useAuth()
  const [email, setEmail] = useState('admin@demo.com')
  const [password, setPassword] = useState('password')
  const [error, setError] = useState('')
  const router = useRouter()

  const signIn = async () => {
    if (!auth.ready) {
      setError('Auth is not ready, try again in a moment.')
      return
    }
    if (!email.length || !password.length) {
      setError('Please enter a username and password.')
      return
    }
    setError('')
    const result = await auth.signIn({ email, password })
    console.log(result)
    if (result.success) {
      router.push('/')
    } else {
      setEmail('')
      setPassword('')
      setError(result.message)
    }
  }

  const signOut = () => {
    if (!auth.ready) {
      setError('Auth is not ready, try again in a moment.')
      return
    }
    auth.signOut()
    router.push('/')
  }

  return (
    <div>
      <div>Sign In</div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          signIn()
        }}
      >
        <div>
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
          <input
            type="password"
            name="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value)
            }}
          />
        </div>
        <button type="submit">Sign in </button>
      </form>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  )
}

export default SignInPage
