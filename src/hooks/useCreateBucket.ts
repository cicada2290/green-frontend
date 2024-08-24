import { useEffect, useState } from 'react'
import { VisibilityType, Long } from '@bnb-chain/greenfield-js-sdk'
import { client, selectSp } from '@/lib/greenfield/client'

interface CreateBucketParams {}

const useBucket = (walletAddress: string) => {
  const [address, setAddress] = useState<string>(walletAddress)

  const handleCreate = async (params: CreateBucketParams) => {
    try {
      if (address == '') {
        throw new Error('Address is required')
      }

      const spInfo = await selectSp()
      console.log('spInfo', spInfo)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    setAddress(walletAddress)
  }, [walletAddress])

  return {
    bucket: 'bucket',
    handleCreate,
  }
}

export default useBucket
