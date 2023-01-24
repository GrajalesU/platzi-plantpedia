import { getPlant } from '@api/index'
import { NextApiHandler } from 'next'

const enablePreview: NextApiHandler = async (request, response) => {
  const slug = request.query.slug

  if (
    request.query.secret !== process.env.PREVIEW_SECRET ||
    typeof slug !== 'string' ||
    slug === ''
  ) {
    return response.status(401).json({ message: 'Invalid token' })
  }

  try {
    const plant = await getPlant(slug, true)

    response.setPreviewData({})

    response.redirect(`/entry/${plant.slug}`)
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(e)
    }
    return response.status(401).json({ message: 'Invalid slug' })
  }
}

export default enablePreview
