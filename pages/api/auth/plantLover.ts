import type { NextApiHandler } from 'next'

const credentialsAuth: NextApiHandler<User> = (request, response) => {
  if (request.method !== 'POST') {
    response.status(405).end()
    return
  }


  if (request.body.password === process.env.AUTH_PLANT_LOVER_SECRET) {
    const plantLoverUser: User = {
      name: 'Plant Lover User',
      email: 'mail@mail.com',
      image: '',
    }

    return response.status(200).json(plantLoverUser)
  }

  response.status(401).end()
}

export default credentialsAuth
