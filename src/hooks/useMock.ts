import { client, mirrorBucket, deleteBucket } from '@/lib/greenfield'
import { useAccount } from 'wagmi'

export const useMock = () => {
  const { address } = useAccount()

  const handle = async () => {
    try {
      if (!address) return
      console.log('address: ', address)

      const tx = await deleteBucket({
        operator: address,
        bucketName: 'xxx',
      })

      console.log('deleteBucketTx: ', tx)

      const simulateInfo = await tx.simulate({
        denom: 'BNB',
      });

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
    }
  }

  return {
    handle,
  }
}
