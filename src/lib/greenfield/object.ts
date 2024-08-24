import { client, getRandomSp, forEach } from '.'
import { ReedSolomon } from '@bnb-chain/reed-solomon'
import {
  bytesFromBase64,
  VisibilityType,
  RedundancyType,
  Long,
} from '@bnb-chain/greenfield-js-sdk'

interface CreateObjectParams {
  address: string
  bucketName: string
  objectName: string
  file: File
}

export const createObject = async (params: CreateObjectParams) => {
  const { address, bucketName, objectName, file } = params

  const rs = new ReedSolomon()
  const fileBytes = await file.arrayBuffer()
  const expectCheckSums = rs.encode(new Uint8Array(fileBytes))

  const createObjectTx = await client.object.createObject({
    bucketName: bucketName,
    objectName: objectName,
    creator: address,
    visibility: VisibilityType.VISIBILITY_TYPE_PUBLIC_READ,
    contentType: file.type,
    redundancyType: RedundancyType.REDUNDANCY_EC_TYPE,
    payloadSize: Long.fromInt(fileBytes.byteLength),
    expectChecksums: expectCheckSums.map((x: any) => bytesFromBase64(x)),
  })

  const simulateInfo = await createObjectTx.simulate({
    denom: 'BNB',
  })

  console.log('simulateInfo', simulateInfo)

  const res = await createObjectTx.broadcast({
    denom: 'BNB',
    gasLimit: Number(simulateInfo?.gasLimit),
    gasPrice: simulateInfo?.gasPrice || '5000000000',
    payer: address,
    granter: '',
  })

  console.log('res', res)

  if (res.code === 0) {
    return res
  }
}

export const getObjectList = async (bucketName: string) => {
  const endpoint = await getRandomSp()
  const objectList = await client.object.listObjects({
    bucketName,
    endpoint,
  })
  forEach(objectList.body)
  return objectList
}
