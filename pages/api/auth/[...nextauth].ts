import type { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'


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
  ],
}

export default NextAuth(authOptions)
