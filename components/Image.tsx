import NextImage, { ImageLoaderProps } from 'next/image'

type AspectRatio = '1:1' | '4:3' | '16:9'

type ImageProps = {
  src: string
  width: number
  height?: never
  aspectRatio: AspectRatio
  fit?: 'pad' | 'fill' | 'crop' | 'scale'
  alt: string
  className?: string
}
export default function Image({
  src,
  width,
  aspectRatio,
  fit = 'scale',
  className = '',
  alt,
}: ImageProps) {
  const height = calcHeight(aspectRatio, width)

  const loader = (props: ImageLoaderProps): string => {
    const loaderHeight = calcHeight(aspectRatio, props.width)

    return `${props.src}?w=${props.width}&h=${loaderHeight}&fit=${fit}`
  }

  return (
    <NextImage
      className={className}
      src={src}
      width={width}
      height={height}
      alt={alt}
      loader={loader}
    />
  )
}

function calcHeight(aspectRatio: AspectRatio, width: number): number {
  const aspectRatioToHeight = {
    '1:1': 1,
    '16:9': 9 / 16,
    '4:3': 3 / 4,
  }

  return Math.floor(width * aspectRatioToHeight[aspectRatio])
}
