import { useState } from 'react'
import { useAccount } from 'wagmi'
import { selectSp, createBucket, multiTx } from '@/lib/greenfield'
import { VisibilityType, Long } from '@bnb-chain/greenfield-js-sdk'

export const useCreateBucket = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { address } = useAccount()

  const handleCreate = async ({ bucketName }: { bucketName: string }) => {
    setLoading(true)
    try {
      if (!address) return

      const spInfo = await selectSp()
      console.log('spInfo', spInfo)

      const createBucketTx = await createBucket({
        creator: address,
        bucketName,
        visibility: VisibilityType.VISIBILITY_TYPE_PRIVATE,
        chargedReadQuota: Long.fromString('0'),
        paymentAddress: address,
        primarySpAddress: spInfo.primarySpAddress,
      })

      const tx = await multiTx([createBucketTx])

      const simulateInfo = await tx.simulate({
        denom: 'BNB',
      })

      console.log('simulateInfo', simulateInfo)

      const res = await tx.broadcast({
        denom: 'BNB',
        gasLimit: Number(simulateInfo?.gasLimit),
        gasPrice: simulateInfo?.gasPrice || '5000000000',
        payer: address,
        granter: '',
      })

      if (res.code !== 0) {
        throw new Error('Failed to create bucket')
      }

      return res
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    handleCreate,
  }
}
