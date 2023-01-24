import { Layout } from '@components/Layout'
import { Button, Typography } from '@material-ui/core'
import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <Layout>
      <div
        className="text-center flex items-center flex-col justify-center"
        style={{
          minHeight: '50vh',
        }}
      >
        <Typography variant="h2" className="mb-6">
          🍂 We are sorry
        </Typography>
        <Typography variant="body1" className="mb-6">
          We could not find what you were looking for
        </Typography>
        <Link href="/" passHref>
          <Button
            color="primary"
            variant="contained"
            href="/"
            title="Go back home"
          >
            Go back home
          </Button>
        </Link>
      </div>
    </Layout>
  )
}
