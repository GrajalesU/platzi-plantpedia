import { Grid } from '@ui/Grid'
import { Typography } from '@ui/Typography'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

export const Footer = ({ className }: { className?: string }) => {
  const { t } = useTranslation('common')
  return (
    <footer
      className={clsx(
        'pt-20 pb-6 bg-black text-gray-300 overflow-hidden',
        className
      )}
    >
      <div className="max-w-screen-xl mx-auto w-95">
        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            sm={5}
            className="text-center sm:text-left relative"
          >
            <PlantpediaLogo />
            <Link href={'/'} className="z-30 relative">
              <Typography variant="h5">Platzi's Plantpedia</Typography>
            </Link>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Typography variant="h5" className="mb-4">
              {t('pages')}
            </Typography>
            <ul className="p0">
              <li className="pb-1">
                <Link href="/category">{t('categories')}</Link>
              </li>
              <li className="pb-1">
                <Link href="/top-stories">{t('top-stories')}</Link>
              </li>
              <li className="pb-1">
                <Link href="/docs">{t('docs')}</Link>
              </li>
              <li className="pb-1">
                <Link href="/ui">{t('ui')}</Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="h5" className="mb-4">
              {t('about')}
            </Typography>
            <p>
              <a href="https://platzi.com/">{t('course-owner')}</a>{' '}
              <a href="https://twitter.com/jonalvarezz">@jonalvarezz</a>
            </p>
            <div className="mt-3">
              <a
                href="https://www.linkedin.com/in/juan-manuel-grajales-urquijo"
                title="Go to linkedIn profile"
                className="pr-4"
              >
                LI
              </a>
              <a
                href="https://github.com/grajalesu/platzi-plantpedia"
                title="Open this project on GitHub"
              >
                GH
              </a>
            </div>
          </Grid>
        </Grid>
        <div className="mt-20 border-t-2 border-gray-600 text-gray-600 pt-6 flex justify-between">
          <p>
            {t('images-from')}
            <a
              target="_blank"
              href="https://www.pexels.com"
              title="Pexels"
              className="ml-1"
            >
              Pexels
            </a>
          </p>
          <p>
            <a target="_blank" href="https://grajalesu.vercel.app">
              grajalesu.vercel.app
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

function PlantpediaLogo() {
  return (
    <>
      <div className="absolute" />
      <style jsx>
        {`
          div {
            width: 205px;
            height: 216px;
            background: url(/leaf.png) center center no-repeat;
            opacity: 0.2;
            bottom: 0;
            left: -40px;
            transform: rotate(120deg);
            z-index: 1;
          }

          @media screen and (min-width: 600px) {
            div {
              bottom: 17px;
            }
          }
        `}
      </style>
    </>
  )
}
