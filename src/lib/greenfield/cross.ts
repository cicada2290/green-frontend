import { client } from '.'
import type { MsgTransferOut } from '@bnb-chain/greenfield-cosmos-types/greenfield/bridge/tx'
import type {
  QueryCrossChainPackageRequest,
  QueryReceiveSequenceRequest,
  QuerySendSequenceRequest,
} from '@bnb-chain/greenfield-cosmos-types/cosmos/crosschain/v1/query'
import type { QueryInturnRelayerRequest } from '@bnb-chain/greenfield-cosmos-types/cosmos/oracle/v1/query'
import type {
  MsgMirrorBucket,
  MsgMirrorGroup,
  MsgMirrorObject,
} from '@bnb-chain/greenfield-cosmos-types/greenfield/storage/tx'

export const getChannelSendSequence = async (
  params: QuerySendSequenceRequest
) => {
  return await client.crosschain.getChannelSendSequence(params)
}

export const getChannelReceiveSequence = async (
  params: QueryReceiveSequenceRequest
) => {
  return await client.crosschain.getChannelReceiveSequence(params)
}

export const getCrosschainPackage = async (
  params: QueryCrossChainPackageRequest
) => {
  return await client.crosschain.getCrosschainPackage(params)
}

export const getInturnRelayer = async (params: QueryInturnRelayerRequest) => {
  return await client.crosschain.getInturnRelayer(params)
}

export const mirrorBucket = async (
  address: string,
  params: MsgMirrorBucket
) => {
  try {
    const tx = await client.crosschain.mirrorBucket(params)
    console.info('mirrorBucketTx: ', tx)

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

    console.log('broadcastRes', res)
  } catch (error) {
    console.error(error)
    throw new Error('Failed to mirror bucket')
  }
}

export const mirrorGroup = async (params: MsgMirrorGroup) => {
  return await client.crosschain.mirrorGroup(params)
}

export const mirrorObject = async (params: MsgMirrorObject) => {
  return await client.crosschain.mirrorObject(params)
}

export const transferOut = (params: MsgTransferOut) => {
  return client.crosschain.transferOut(params)
}
