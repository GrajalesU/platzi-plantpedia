import type { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'
import GitHubProvider from 'next-auth/providers/github'

export const authOptions: NextAuthOptions = {
  theme: {
    colorScheme: 'light',
  },
  debug: true,
  session: {},
  jwt: {},
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialProvider({
      name: 'PlantLover',
      credentials: {
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '********',
        },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXTAUTH_URL}/api/auth/plantLover`,
          {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'Content-type': 'application/json' },
          }
        )

        const user = await res.json()

        if (res.ok && user) {
          return user
        }
        return null
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    }),
  ],
}

export default NextAuth(authOptions)
