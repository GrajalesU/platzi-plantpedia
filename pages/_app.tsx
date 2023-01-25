import { QueryProvider } from '@api/QueryProvider'
import { UIProvider } from '@ui/Provider'
import { useServerStyles } from '@ui/ssr'
import { SessionProvider } from 'next-auth/react'
import { appWithTranslation } from 'next-i18next'
import { AppProps } from 'next/app'
import '../ui/globals.css'

const NextApp = ({ Component, pageProps }: AppProps) => {
  useServerStyles()

  return (
    <SessionProvider session={pageProps.session}>
      <QueryProvider>
        <UIProvider>
          <Component {...pageProps} />
        </UIProvider>
      </QueryProvider>
    </SessionProvider>
  )
}

export default appWithTranslation(NextApp)
