import { getAuthorList, getPlantListByAuthor } from '@api/index'
import Image from '@components/Image'
import { Layout } from '@components/Layout'
import { PlantCollection } from '@components/PlantCollection'
import { Typography } from '@material-ui/core'
import { flatMap } from 'lodash'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'

type AuthorDetailProps = {
  author: Author
  plants: Plant[]
}

export const getStaticProps: GetStaticProps<AuthorDetailProps> = async ({
  params,
}) => {
  const handle = params?.handle
  if (typeof handle !== 'string') {
    return {
      notFound: true,
    }
  }

  try {
    const authors = await getAuthorList()
    const author = authors.filter((author) => author.handle === handle)[0]
    const plants = await getPlantListByAuthor({
      authorId: author.id,
    })

    return {
      props: {
        author,
        plants,
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
    handle: string
  }
  locale: string
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  if (locales === undefined) {
    throw new Error(
      'Oh, did you forget to configure locales in your Next Configuration (Next.config.js)'
    )
  }

  const authors = await getAuthorList()
  const paths: PathType[] = flatMap(
    authors.map(({ handle }: Author) => ({
      params: {
        handle,
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
    fallback: false,
  }
}

export default function AuthorDetail({
  author,
  plants,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <div className="relative text-center pb-10 mb-10 border-b-2 border-grey-200">
        <div className="opacity-60 inline-block">
          <Image
            src={author.photo.url}
            width={600}
            alt={author.photo.title}
            aspectRatio="1:1"
          />
        </div>
        <div className="text-container absolute">
          <Typography
            variant="h1"
            className="break-words text-left text-6xl sm:text-8xl"
          >
            {author.fullName}
          </Typography>
          <Typography
            variant="h2"
            className="mt-5 text-left ml-8"
            color="textPrimary"
          >
            {author.handle}
          </Typography>
          <Typography
            variant="h5"
            component="p"
            className="mt-5 text-left ml-10"
            color="textPrimary"
          >
            {author.biography}
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
