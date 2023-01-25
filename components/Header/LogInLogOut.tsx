import { Button } from '@ui/Button'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'

export default function LogInLogOut() {
  const { data: session, status } = useSession()
  const { t } = useTranslation(['common'])

  if (status === 'loading') return null

  if (!session)
    return (
      <div className="flex gap-1 flex-grow w-2/5 items-center">
        <Button onClick={() => signIn()}>{t('signIn')}</Button>
      </div>
    )

  return (
    <div className="flex gap-1 flex-grow w-full items-center">
      <Button onClick={() => signOut()}>{t('signOut')}</Button>
      <span className="block">{session.user?.name}</span>
    </div>
  )
}
