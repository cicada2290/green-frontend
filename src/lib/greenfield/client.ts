import { GREEN_CHAIN_ID, GRPC_URL } from '@/config/env'
import { Client } from '@bnb-chain/greenfield-js-sdk'

export const client = Client.create(GRPC_URL, String(GREEN_CHAIN_ID))

export const getSps = async () => {
  const sps = await client.sp.getStorageProviders()
  const finalSps = (sps ?? []).filter((v: any) =>
    v.endpoint.includes('nodereal')
  )

  return finalSps
}

export const selectSp = async () => {
  const finalSps = await getSps()

  const selectIndex = Math.floor(Math.random() * finalSps.length)

  const secondarySpAddresses = [
    ...finalSps.slice(0, selectIndex),
    ...finalSps.slice(selectIndex + 1),
  ].map((item) => item.operatorAddress)
  const selectSpInfo = {
    id: finalSps[selectIndex].id,
    endpoint: finalSps[selectIndex].endpoint,
    primarySpAddress: finalSps[selectIndex]?.operatorAddress,
    sealAddress: finalSps[selectIndex].sealAddress,
    secondarySpAddresses,
  }

  return selectSpInfo
}

export const getRandomSp = async () => {
  const sps = await client.sp.getStorageProviders()
  const finalSps = (sps ?? []).filter(
    (v: any) =>
      v?.description?.moniker !== 'QATest' &&
      (v.endpoint.indexOf('bnbchain.org') > 0 ||
        v.endpoint.indexOf('nodereal.io') > 0)
  )
  return finalSps[Math.floor(Math.random() * finalSps.length)].endpoint
}
