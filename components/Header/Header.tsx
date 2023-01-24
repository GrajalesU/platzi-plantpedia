import { NavBar } from '@ui/NavBar'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import LocaleSwitcher from './LocaleSwitcher'
import { PreviewModeBanner } from './PreviewModeBanner'

export function Header() {
  const { t } = useTranslation('common')
  return (
    <>
      <PreviewModeBanner />
      <div className="mx-auto relative" style={{ maxWidth: '98%' }}>
        <LocaleSwitcher className="flex-grow flex gap-1 justify-items-center" />
        <NavBar title="🌿 Plantpedia">
          <div className="change-color">
            <Link
              href={'/category'}
              className="mx-4 hover:text-gray-500 transition-colors"
            >
              {t('categories')}
            </Link>
            <Link
              className="hover:text-gray-500 transition-colors"
              href={'/top-stories'}
            >
              {t('authors')}
            </Link>
          </div>
        </NavBar>
      </div>
    </>
  )
}
