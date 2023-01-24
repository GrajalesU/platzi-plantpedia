import { getCategoryList } from '@api/index'
import Image from '@components/Image'
import { Layout } from '@components/Layout'
import { Button, Grid, Typography } from '@material-ui/core'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'

type CategoryProps = {
  categories: Category[]
}

export const getStaticProps: GetStaticProps<CategoryProps> = async ({
  locale,
}) => {
  const categories = await getCategoryList({ locale })
  const i18nConf = await serverSideTranslations(locale!)


  return {
    props: {
      categories,
      ...i18nConf
    },
    revalidate: 10 * 60,
  }
}

export default function Category({
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation('common')
  console.log(t("categories"))

  return (
    <Layout>
      <Typography variant="h1" className="break-words pb-4 px-4">
        {t("categories")}
      </Typography>
      <Grid container component="ul" spacing={4}>
        {categories.map((category) => (
          <Grid key={category.id} role="listitem" item xs={6} md={4}>
            <Link href={`/category/${category.slug}`}>
              <div className="opacity-95 hover:opacity-100">
                <Image
                  src={category.icon.url}
                  alt={category.icon.title}
                  width={300}
                  aspectRatio="16:9"
                />
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
            </Link>
          </Grid>
        ))}
      </Grid>
    </Layout>
  )
}
