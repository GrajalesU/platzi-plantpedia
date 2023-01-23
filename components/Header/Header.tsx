import { NavBar } from '@ui/NavBar'
import Link from 'next/link'

export function Header() {
  return (
    <div className="mx-auto" style={{ maxWidth: '98%' }}>
      <NavBar title="🌿 Plantpedia">
        <div>
          <Link href={'/category'}>Categories</Link>
        </div>
      </NavBar>
    </div>
  )
}
