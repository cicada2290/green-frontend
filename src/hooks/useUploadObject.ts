import { useState } from 'react'
import { useAccount } from 'wagmi'
import { createObject } from '@/lib/greenfield'

export const useUploadObject = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { address } = useAccount()

  const handleUpload = async ({
    bucketName,
    filename,
    text,
  }: {
    bucketName: string
    filename: string
    text: string
  }) => {
    try {
      if (!address) return

      setLoading(true)

      await createObject({
        bucketName,
        objectName: `${filename}.txt`,
        file: new File([text], `${filename}.txt`),
        address: address,
      })
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    handleUpload,
  }
}
