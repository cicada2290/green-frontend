'use client'

import { useRouter } from 'next/navigation'
import { useDynamicContext } from '@/lib/dynamic'
import BucketContent from '@/components/contents/Bucket'

const Bucket = ({ params }: { params: { bucketName: string } }) => {
  const router = useRouter()

  const { primaryWallet } = useDynamicContext()

  if (!primaryWallet) return router.push('/')

  return (
    <BucketContent bucketName={params.bucketName} />
  )
}

export default Bucket
