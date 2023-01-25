import { getCategoryList, getPlant, getPlantList } from '@api/index'
import { AuthorCard } from '@components/AuthorCard'
import Image from '@components/Image'
import { Layout } from '@components/Layout'
import { PlantEntryInline } from '@components/PlantCollection'
import { RichText } from '@components/RichText'
import { Grid, Typography } from '@material-ui/core'
import { flatMap } from 'lodash'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'

type ProductDetailProps = {
  plant: Plant
  otherEntries: Plant[] | null
  categories: Category[] | null
}

export const getStaticProps: GetStaticProps<ProductDetailProps> = async ({
  params,
  preview,
  locale,
}) => {
  const slug = params?.slug
  if (typeof slug !== 'string') {
    return {
      notFound: true,
    }
  }
  try {
    const plant = await getPlant(slug, preview, locale)
    const otherEntries = await getPlantList({
      limit: 5,
      locale,
    })
    const categories = await getCategoryList({
      limit: 10,
      locale,
    })
    const i18nConf = await serverSideTranslations(locale!)

    return {
      props: {
        plant,
        otherEntries,
        categories,
        ...i18nConf,
      },
      revalidate: 5 * 60,
    }
  } catch (_) {
    return {
      notFound: true,
    }
  }
}

type PathType = {
  params: {
    slug: string
  }
  locale: string
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  if (locales === undefined) {
    throw new Error(
      'Oh, did you forget to configure locales in your Next Configuration (Next.config.js)'
    )
  }

  const plants = await getPlantList({ limit: 10 })

  const paths: PathType[] = flatMap(
    plants.map(({ slug }: Plant) => ({
      params: {
        slug,
      },
    })),
    (path) =>
      locales.map((locale) => ({
        locale,
        ...path,
      }))
  )
  return {
    paths,
    fallback: 'blocking',
  }
}

export default function PlantDetail({
  plant,
  otherEntries,
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation(['entries'], { useSuspense: false })

  return (
    <Layout>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8} lg={9} component="article">
          <figure>
            <Image
              src={plant.image.url}
              width={plant.image.width}
              alt={plant.image.title}
              aspectRatio="16:9"
              fit="fill"
            />
          </figure>
          <div className="px-12 pt-8">
            <Typography variant="h2">{plant.plantName}</Typography>
          </div>
          <div className="p-10">
            <RichText richText={plant.description} />
          </div>
        </Grid>
        <Grid item xs={12} md={4} lg={3} component="aside">
          <section>
            <Typography variant="h5" component="h3" className="mb-4">
              {t('recent-posts')}
            </Typography>
            {otherEntries?.map((entry) => (
              <article className="mb-4" key={entry.id}>
                <PlantEntryInline {...entry} />
              </article>
            ))}
          </section>
          <section className="mt-10">
            <Typography variant="h5" component="h3" className="mb-4">
              {t('categories')}
            </Typography>
            <ul className="list">
              {categories?.map((category) => (
                <li key={category.id}>
                  <Link passHref href={`/category/${category.slug}`}>
                    <Typography
                      component="a"
                      variant="h6"
                      className="hover:text-gray-500 transition-colors"
                    >
                      {category.title}
                    </Typography>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </Grid>
      </Grid>
      <section className="my-4 border-t-2 border-b-2 border-gray-200 pt-12 pb-7">
        <AuthorCard {...plant.author} />
      </section>
    </Layout>
  )
}
