import { getAuthorList } from '@api/index'
import Image from '@components/Image'
import { Layout } from '@components/Layout'
import { Grid, Typography } from '@material-ui/core'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'

type AuthorsProps = {
  authors: Author[]
}

export const getStaticProps: GetStaticProps<AuthorsProps> = async ({locale}) => {
  const authors = await getAuthorList()
  const i18nConf = await serverSideTranslations(locale!)

  return {
    props: {
      authors,
      ...i18nConf,
    },
    revalidate: 10 * 60,

  }
}

export default function Authors({
  authors,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation(['common'], { useSuspense: false })

  return (
    <Layout>
      <Typography variant="h1" className="break-words pb-8 px-4">
      {t('authors')}
      </Typography>
      <Grid container spacing={4} className="mb-10" justify="center">
        {authors.map(({ id, photo, fullName, handle }) => (
          <Grid
            item
            key={id}
            className=" m-5 transform hover:scale-125 transition"
          >
            <Link href={`/top-stories/${handle}`}>
              <Image
                src={photo.url}
                width={150}
                alt={photo.title}
                aspectRatio="1:1"
              />
              <Typography variant="h5" component="p">
                {fullName}
              </Typography>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Layout>
  )
}
