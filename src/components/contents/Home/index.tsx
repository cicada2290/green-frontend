'use client'

import { useBucketList } from '@/hooks/useBucketList'
import BucketListTable from './BucketListTable'

const HomeContent: React.FC = () => {
  const { list, loading } = useBucketList()

  return (
    <>
      <BucketListTable list={list} />
    </>
  )
}

export default HomeContent
