import { client, getRandomSp, forEach } from '.'

export const getBucketList = async (address: string) => {
  const endpoint = await getRandomSp()
  const bucketList = await client.bucket.listBuckets({
    address,
    endpoint,
  })
  forEach(bucketList.body)
  return bucketList
}
