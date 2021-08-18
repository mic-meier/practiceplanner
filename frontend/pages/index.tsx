import { useAuth } from '@frontend/components/auth'
import Link from 'next/link'

const Home = () => {
  const auth = useAuth()

  return (
    <div>
      <h1>Hello World!</h1>
      {auth.ready && auth.user ? (
        <p>
          You&apos;re signed in as {auth.user.name} |{' '}
          <button onClick={() => auth.signOut()}>sign out</button>
        </p>
      ) : (
        <p>
          <Link href="/signin">Sign In</Link> | <Link href="/signup">Join</Link>
        </p>
      )}
    </div>
  )
}

export default Home
