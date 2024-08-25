import { client, getRandomSp, forEach } from '.'
import type { GetUserBucketsRequest } from '@bnb-chain/greenfield-js-sdk'
import type {
  MsgCreateBucket,
  MsgDeleteBucket,
} from '@bnb-chain/greenfield-cosmos-types/greenfield/storage/tx'

export const createBucket = async (params: MsgCreateBucket) => {
  return await client.bucket.createBucket(params)
}

export const deleteBucket = async (params: MsgDeleteBucket) => {
  return await client.bucket.deleteBucket(params)
}

export const listBuckets = async (configParam: GetUserBucketsRequest) => {
  return await client.bucket.listBuckets(configParam)
}

export const getBucketList = async (address: string) => {
  const endpoint = await getRandomSp()
  const bucketList = await client.bucket.listBuckets({
    address,
    endpoint,
  })
  forEach(bucketList.body)
  return bucketList
}
