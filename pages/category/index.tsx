import { getCategoryList } from '@api/index'
import { Layout } from '@components/Layout'
import { Button, Grid, Typography } from '@material-ui/core'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'

type CategoryProps = {
  categories: Category[]
}

export const getStaticProps: GetStaticProps<CategoryProps> = async () => {
  const categories = await getCategoryList()

  return {
    props: {
      categories,
    },
    revalidate: 10 * 60,
  }
}

export default function Category({
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Typography variant="h1" className="break-words pb-4 px-4">
        Categories
      </Typography>
      <Grid container component="ul" spacing={4}>
        {categories.map((category) => (
          <Grid key={category.id} role="listitem" item xs={6} md={4}>
            <div className="opacity-95 hover:opacity-100">
              <img src={category.icon.url} alt={category.icon.title} />
              <Typography variant="h3">{category.title}</Typography>
              <div className="px-4 py-4">
                <Typography
                  variant="body1"
                  className="my-6"
                  color="textSecondary"
                >
                  {category.description}
                </Typography>
                <Link href={`/category/${category.slug}`} passHref>
                  <Button>Read more</Button>
                </Link>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </Layout>
  )
}
