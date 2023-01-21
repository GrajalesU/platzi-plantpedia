import { getPlantList } from '@api/index'
import { Layout } from '@components/Layout'
import { PlantCollection } from '@components/PlantCollection'
import { useEffect, useState } from 'react'

const PLANT_LIMIT = 10

export default function Home() {
  const [plants, setPlants] = useState<Plant[]>([])
  useEffect(() => {
    getPlantList({ limit: PLANT_LIMIT }).then((data) => setPlants(data))
  }, [])
  console.log(plants)
  return (
    <Layout>
      <PlantCollection plants={plants} variant="square" />
    </Layout>
  )
}
