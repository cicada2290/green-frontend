'use client'

import { useDynamicContext } from '@/lib/dynamic'
import HomeContent from '@/components/contents/Home'

export default function Home() {
  const { primaryWallet } = useDynamicContext()

  if (!primaryWallet) return <div>No wallet connected</div>

  return <HomeContent />
}
