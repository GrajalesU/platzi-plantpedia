import { NavBar } from '@ui/NavBar'
import Link from 'next/link'
import LocaleSwitcher from './LocaleSwitcher'
import { PreviewModeBanner } from './PreviewModeBanner'

export function Header() {
  return (
    <>
      <PreviewModeBanner />
      <div className="mx-auto relative" style={{ maxWidth: '98%' }}>
        <NavBar title="🌿 Plantpedia">
          <LocaleSwitcher className='flex-grow flex gap-1 justify-items-center'/>
          <div className="change-color">
            <Link
              href={'/category'}
              className="mx-4 hover:text-gray-500 transition-colors"
            >
              Categories
            </Link>
            <Link
              className="hover:text-gray-500 transition-colors"
              href={'/top-stories'}
            >
              Authors
            </Link>
          </div>
        </NavBar>
      </div>
    </>
  )
}
