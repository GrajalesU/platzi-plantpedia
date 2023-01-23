import { NavBar } from '@ui/NavBar'
import Link from 'next/link'

export function Header() {
  return (
    <div className="mx-auto" style={{ maxWidth: '98%' }}>
      <NavBar title="🌿 Plantpedia">
        <div className='change-color'>
          <Link href={'/category'} className='mx-4 hover:text-gray-500 transition-colors'>Categories</Link>
          <Link className='hover:text-gray-500 transition-colors' href={'/top-stories'}>Authors</Link>
        </div>
      </NavBar>
    </div>
  )
}
