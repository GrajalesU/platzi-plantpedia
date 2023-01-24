import { Layout } from '@components/Layout'
import { Button, Typography } from '@material-ui/core'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: await serverSideTranslations(locale!),
})

export default function NotFoundPage() {
  const { t } = useTranslation('notFound')
  return (
    <Layout>
      <div
        className="text-center flex items-center flex-col justify-center"
        style={{
          minHeight: '50vh',
        }}
      >
        <Typography variant="h2" className="mb-6">
          🍂 {t('sorry')}
        </Typography>
        <Typography variant="body1" className="mb-6">
        {t('description')}
        </Typography>
        <Link href="/" passHref>
          <Button
            color="primary"
            variant="contained"
            href="/"
            title="Go back home"
          >
        {t('goBack')}
          </Button>
        </Link>
      </div>
    </Layout>
  )
}
