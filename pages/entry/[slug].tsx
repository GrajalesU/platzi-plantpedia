import { QueryStatus, getPlant } from '@api/index'
import { AuthorCard } from '@components/AuthorCard'
import { Layout } from '@components/Layout'
import { RichText } from '@components/RichText'
import { Grid, Typography } from '@material-ui/core'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'

export default function PlantDetail() {
  const [status, setStatus] = useState<QueryStatus>('idle')
  const [plant, setPlant] = useState<Plant | null>(null)
  const router = useRouter()
  const { slug } = router.query

  useEffect(() => {
    if (typeof slug !== 'string') {
      return
    }
    setStatus('loading')
    getPlant(slug)
      .then((data) => {
        setPlant(data)
        setStatus('success')
      })
      .catch(() => {
        setStatus('error')
      })
  }, [slug])

  if (status === 'idle' || status === 'loading') {
    return (
      <Layout>
        <main>Loading awesomeness...</main>
      </Layout>
    )
  }

  if (status === 'error' || plant === null) {
    return (
      <Layout>
        <main>Error, site not found</main>
      </Layout>
    )
  }

  if (status === 'success')
    return (
      <Layout>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8} lg={9} component="article">
            <figure>
              <img src={plant.image.url} />
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
                Recent Posts
              </Typography>
            </section>
            <section className="mt-10">
              <Typography variant="h5" component="h3" className="mb-4">
                Categories
              </Typography>
            </section>
          </Grid>
        </Grid>
        <section className="my-4 border-t-2 border-b-2 border-gray-200 pt-12 pb-7">
          <AuthorCard {...plant.author} />
        </section>
      </Layout>
    )
}
