'use client'

import { Box, Button } from '@mui/material'
import { useDeleteBucket } from '@/hooks/useDeleteBucket'
import { useMock } from '@/hooks/useMock'

const Demo: React.FC = () => {
  const { handle } = useMock()
  const { handleDelete } = useDeleteBucket()

  const handleClick = async () => {
    try {
      await handleDelete({
        bucketName: 'xxx',
      })
    } catch (error) {
      console.error(error)
    }
  }

  /*
  const handle = async () => {
    try {
      if (!address) return
      console.log("address: ", address)

      const tx = await client.bucket.deleteBucket({
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

      console.log('broadcastRes', res)
      /*
      const tx = await client.crosschain.mirrorBucket({
        id: '0x0000000000000000000000000000000000000000000000000000000000004803',
        bucketName: 'pokotaro',
        operator: '0xB7c9cBBE3189B76bfD87E7555837Af6ba7e35A24',
        destChainId: 97,
      })

      console.log('mirrorBucketTx: ', tx)

      const simulateInfo = await tx.simulate({
        denom: 'BNB',
      });

      console.log('simulateInfo', simulateInfo)
    } catch (error) {
      console.error(error)
    }
  }
  */

  return (
    <Box>
      <Button variant="contained" sx={{ mx: 1 }} onClick={handleClick}>
        Hello World
      </Button>
    </Box>
  )
}

export default Demo
