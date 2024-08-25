import { useState } from 'react'
import { useAccount } from 'wagmi'
import { deleteBucket } from '@/lib/greenfield'

export const useDeleteBucket = () => {
  const { address } = useAccount()

  const [loading, setLoading] = useState<boolean>(false)

  const handleDelete = async ({ bucketName }: { bucketName: string }) => {
    try {
      setLoading(true)

      if (!address) return
      console.log('address: ', address)

      const deleteBucketTx = await deleteBucket({
        operator: address,
        bucketName: bucketName,
      })

      console.log('deleteBucketTx: ', deleteBucketTx)

      const simulateInfo = await deleteBucketTx.simulate({
        denom: 'BNB',
      })

      console.log('simulateInfo', simulateInfo)

      const res = await deleteBucketTx.broadcast({
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
    handleDelete,
  }
}
