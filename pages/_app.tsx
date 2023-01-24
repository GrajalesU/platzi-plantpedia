import { QueryProvider } from '@api/QueryProvider'
import { UIProvider } from '@ui/Provider'
import { useServerStyles } from '@ui/ssr'
import { appWithTranslation } from 'next-i18next'
import { AppProps } from 'next/app'
import '../ui/globals.css'

const NextApp = ({ Component, pageProps }: AppProps) => {
  useServerStyles()

  return (
    <QueryProvider>
      <UIProvider>
        <Component {...pageProps} />
      </UIProvider>
    </QueryProvider>
  )
}

export default appWithTranslation(NextApp)
