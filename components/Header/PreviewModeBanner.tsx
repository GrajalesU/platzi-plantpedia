import { useEffect, useState } from 'react'

import { Button } from '@ui/Button'
import { Alert } from '@ui/Alert'
import { useRouter } from 'next/router'

type PreviewStatusResponse = {
  preview: boolean
  context: Json
} | null

export function PreviewModeBanner() {
  const router = useRouter()

  if (!router.isPreview) {
    return null
  }

  return (
    <div className="fixed -right-8 bottom-16 w-md transform translate-x-2/3 hover:-translate-x-8 z-10 transition-transform duration-300">
      <Alert
        variant="filled"
        severity="warning"
        action={
          <Button variant="text" color="inherit" href="/api/preview/exit">
            Disable preview mode
          </Button>
        }
      >
        <div className="max-w-md">Preview mode is enabled</div>
      </Alert>
    </div>
  )
}