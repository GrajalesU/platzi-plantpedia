import { getPlantList } from '@api/index'
import { Authors } from '@components/Authors'
import { Hero } from '@components/Hero'
import { Layout } from '@components/Layout'
import { PlantCollection } from '@components/PlantCollection'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useEffect } from 'react'

const PLANT_LIMIT = 10

type HomeProps = {
  plants: Plant[]
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const plants = await getPlantList({ limit: PLANT_LIMIT })

  return {
    props: {
      plants,
    },
    revalidate: 5 * 60,
  }
}

export default function Home({
  plants,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  useEffect(() => {}, [])
  return (
    <Layout>
      <Hero {...plants[0]} className="mb-20" />
      <Authors className="mb-10" />
      <PlantCollection
        plants={plants.slice(1, 3)}
        variant="vertical"
        className="mb-24"
      />
      <PlantCollection
        plants={plants.length > 8 ? plants.slice(3, 9) : plants}
        variant="square"
      />
    </Layout>
  )
}
