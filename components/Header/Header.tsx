import { NavBar } from '@ui/NavBar'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import LocaleSwitcher from './LocaleSwitcher'
import LogInLogOut from './LogInLogOut'
import { PreviewModeBanner } from './PreviewModeBanner'

export function Header() {
  const { t } = useTranslation(['common'], { useSuspense: false })
  return (
    <>
      <PreviewModeBanner />
      <div className="mx-auto relative" style={{ maxWidth: '98%' }}>
        <div className="flex">
          <LogInLogOut />
          <LocaleSwitcher className="flex-grow flex gap-1 justify-items-center" />
        </div>
        <NavBar title="🌿 Plantpedia">
          <div
            className="flex gap-4"
            style={{
              gap: '1rem',
            }}
          >
            <Link
              href={'/category'}
              className=" hover:text-gray-500 transition-colors"
            >
              {t('categories')}
            </Link>
            <Link
              className="hover:text-gray-500 transition-colors"
              href={'/top-stories'}
            >
              {t('authors')}
            </Link>
            <Link
              className="hover:text-gray-500 transition-colors"
              href="/search"
            >
              {t('search')}
            </Link>
          </div>
        </NavBar>
      </div>
    </>
  )
}
