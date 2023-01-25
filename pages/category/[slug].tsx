import { getCategoryList, getPlantListByCategory } from '@api/index'
import Image from '@components/Image'
import { Layout } from '@components/Layout'
import { PlantCollection } from '@components/PlantCollection'
import { Typography } from '@material-ui/core'
import { flatMap } from 'lodash'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'

type CategoryProps = {
  category: Category
  plants: Plant[]
}

export const getStaticProps: GetStaticProps<CategoryProps> = async ({
  params,
  locale,
}) => {
  const slug = params?.slug
  if (typeof slug !== 'string') {
    return {
      notFound: true,
    }
  }

  try {
    const { category, entries: plants } = await getPlantListByCategory({
      category: slug,
      locale,
    })
  const i18nConf = await serverSideTranslations(locale!)


    return {
      props: {
        category,
        plants,
        ...i18nConf
      },
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

  const categories = await getCategoryList()
  const paths: PathType[] = flatMap(
    categories.map(({ slug }: Category) => ({
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

export default function Category({
  category,
  plants,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  if (router.isFallback) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          Loading...
        </div>
      </Layout>
    )
  }
  return (
    <Layout>
      <div className="relative text-center mb-10">
        <div className="opacity-60 inline-block">
          <Image
            src={category.icon.url}
            width={600}
            alt={category.icon.title}
            aspectRatio="16:9"
          />
        </div>
        <div className="text-container absolute">
          <Typography
            variant="h1"
            className="break-words text-left text-6xl sm:text-8xl"
          >
            {category.title}
          </Typography>
          <Typography
            variant="h5"
            component="p"
            className="mt-5 text-left"
            color="textPrimary"
          >
            {category.description}
          </Typography>
        </div>
      </div>
      <PlantCollection plants={plants} variant="square" />

      <style jsx>{`
        .text-container {
          top: 50%;
          transform: translateY(-50%);
          max-width: 400px;
          left: 3vh;
        }

        @media screen and (min-width: 600px) {
          .text-container {
            max-width: 600px;
            left: 10vh;
          }
        }

        @media screen and (min-width: 1300px) {
          .text-container {
            max-width: 600px;
            left: 15vh;
          }
        }
      `}</style>
    </Layout>
  )
}
