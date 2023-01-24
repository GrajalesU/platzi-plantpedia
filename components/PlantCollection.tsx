import { Button } from '@ui/Button'
import { Grid, GridProps } from '@ui/Grid'
import { Typography } from '@ui/Typography'
import Link from 'next/link'

import { Excerpt } from '@components/Excerpt'
import Image from '@components/Image'

type PlantCollectionProps = {
  plants: Plant[]
  variant?: 'square' | 'vertical'
  className?: string
}

export function PlantCollection({
  plants,
  variant,
  className,
}: PlantCollectionProps) {
  return (
    <Grid container component="ul" spacing={4} className={className}>
      {plants.map((plant) => (
        <PlantEntry key={plant.id} plant={plant} variant={variant} />
      ))}
    </Grid>
  )
}

type PlantEntryType = {
  plant: Plant
  variant?: 'square' | 'vertical'
}

export function PlantEntry({ plant, variant = 'square' }: PlantEntryType) {
  let gridItemProps: GridProps = { xs: 6, md: 4 }
  let Component: (props: Plant) => JSX.Element = PlantEntrySquare

  if (variant === 'vertical') {
    Component = PlantEntryVertical
    gridItemProps = {
      xs: 12,
      sm: 6,
    }
  }

  return (
    <Grid key={plant.id} role="listitem" item {...gridItemProps}>
      <Component {...plant} />
    </Grid>
  )
}

export function PlantEntrySquare({ image, plantName, slug }: Plant) {
  return (
    <Link href={`/entry/${slug}`}>
      <div className="opacity-80 hover:opacity-100">
        <Image
          src={image.url}
          alt={image.title}
          width={460}
          aspectRatio="4:3"
        />
        <div className="p-4">
          <Typography variant="h4" className="break-words">
            {plantName}
          </Typography>
        </div>
      </div>
    </Link>
  )
}

export function PlantEntryInline({
  image,
  plantName,
  slug,
  className,
}: Plant & { className?: string }) {
  return (
    <Link href={`/entry/${slug}`}>
      <div
        className={`opacity-80 hover:opacity-100 flex items-end ${className}`}
      >
        <Image
          src={image.url}
          width={84}
          alt={image.title}
          aspectRatio="1:1"
          className="flex-none"
        />
        <div className="pl-2 flex-auto">
          <Typography variant="h6" className="break-words">
            {plantName}
          </Typography>
        </div>
      </div>
    </Link>
  )
}

export function PlantEntryVertical({
  image,
  plantName,
  description,
  slug,
}: Plant) {
  return (
    <div className="opacity-80 hover:opacity-100">
      <Link href={`/entry/${slug}`}>
        <Image
          src={image.url}
          width={624}
          alt={image.title}
          aspectRatio="16:9"
        />
        <Typography variant="h2" className="break-words pt-4 px-4">
          {plantName}
        </Typography>
      </Link>
      <div className="px-4 pb-4">
        <Excerpt
          richText={description}
          color="textSecondary"
          className="py-6"
        />
        <Link href={`/entry/${slug}`} passHref>
          <Button>Read more</Button>
        </Link>
      </div>
    </div>
  )
}
