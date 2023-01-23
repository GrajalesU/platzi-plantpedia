import { NavBar } from '@ui/NavBar'
import Link from 'next/link'

export function Header() {
  return (
    <div className="mx-auto" style={{ maxWidth: '98%' }}>
      <NavBar title="🌿 Plantpedia">
        <div>
          <Link href={'/category'} className='mx-4'>Categories</Link>
          <Link href={'/top-stories'}>Authors</Link>
        </div>
      </NavBar>
    </div>
  )
}
