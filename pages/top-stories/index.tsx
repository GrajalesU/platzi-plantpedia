import { getAuthorList } from '@api/index'
import { Layout } from '@components/Layout'
import { Grid, Typography } from '@material-ui/core'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'

type AuthorsProps = {
  authors: Author[]
}

export const getStaticProps: GetStaticProps<AuthorsProps> = async () => {
  const authors = await getAuthorList()
  return {
    props: {
      authors,
    },
    revalidate: 10 * 60,
  }
}

export default function Authors({
  authors,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Typography variant="h1" className="break-words pb-8 px-4">
        Authors
      </Typography>
      <Grid container spacing={4} className="mb-10" justify="center">
        {authors.map(({ id, photo, fullName, handle }) => (
          <Grid item key={id} className=' m-5 transform hover:scale-125 transition'>
            <Link href={`/top-stories/${handle}`}>
              <img src={photo.url} width={150} />
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
