import { QueryStatus, getAuthorList } from '@api'
import Image from '@components/Image'
import { Grid } from '@ui/Grid'
import { Typography } from '@ui/Typography'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type AuthorProps = {
  className?: string
}

export function Authors({ className }: AuthorProps) {
  const { data, status } = useAuthors()

  if (data == null || status !== 'success') {
    const dummyItems = Array.from({ length: 4 }, (_, i) => `item-${i}`)
    return (
      <Grid container spacing={4} className={className} justify="center">
        {dummyItems.map((item) => (
          <Grid
            xs={2}
            item
            key={item}
            className="bg-gray-200 animate pulse"
          ></Grid>
        ))}
      </Grid>
    )
  }

  return (
    <Grid container spacing={4} className={className} justify="center">
      {data.map(({ id, photo, fullName, handle }) => (
        <Grid item key={id} className="transform hover:scale-110 transition">
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
  )
}

function useAuthors() {
  const [status, setStatus] = useState<QueryStatus>('idle')
  const [data, setData] = useState<Author[] | null>(null)

  useEffect(
    () => {
      setStatus('loading')
      getAuthorList({ limit: 10 })
        .then((returnedData) => {
          setData(returnedData)
          setStatus('success')
        })
        .catch(() => setStatus('error'))
    },
    [
      // Run effect once
    ]
  )

  return {
    status,
    data,
  }
}
