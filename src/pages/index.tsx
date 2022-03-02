import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'

const Home: NextPage = () => {
  const { data: session, status } = useSession()

  return (
    <div>
      <h1>Github OAuth Demo</h1>

      {!session?.user ? (
        <>
          <button onClick={() => signIn('github')}>Sign in with Github</button>
        </>
      ) : (
        <>
          <p>
            Not {session.user?.name || session.user?.email}? Then Logout and
            login again
          </p>
          <button onClick={() => signOut()}>Logout</button> <br />
          <Link href="books/search">search</Link>
          <Link href="books/my">my books</Link>
        </>
      )}
    </div>
  )
}

export default Home
