import NextAuth, { Account, User } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import GithubProvider from 'next-auth/providers/github'

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'gist',
        },
      },
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.AUTH_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    async redirect() {
      return '/'
    },

    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }

      return token
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken
      return session
    },
  },
})
