'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface MetaRedirectProps {
  to: string
  delay?: number
}

export default function MetaRedirect({ to, delay = 0 }: MetaRedirectProps) {
  const router = useRouter()

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push(to)
    }, delay)

    return () => clearTimeout(timeout)
  }, [to, delay, router])

  return (
    <>
      <meta httpEquiv="refresh" content={`${delay / 1000};url=${to}`} />
      <link rel="canonical" href={to} />
    </>
  )
}
