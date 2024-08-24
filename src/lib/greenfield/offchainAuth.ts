import { client, getAllSps } from '.'
import { GREEN_CHAIN_ID } from '@/config/env'
import { IReturnOffChainAuthKeyPairAndUpload } from '@bnb-chain/greenfield-js-sdk'

/**
 * generate off-chain auth key pair and upload public key to sp
 */
export const getOffchainAuthKeys = async (address: string, provider: any) => {
  console.info('[getOffchainAuthKeys]')
  const storageResStr = localStorage.getItem(address)

  if (storageResStr) {
    console.info('=> getOffchainAuthKeys from storage')
    const storageRes = JSON.parse(
      storageResStr
    ) as IReturnOffChainAuthKeyPairAndUpload
    if (storageRes.expirationTime < Date.now()) {
      console.info('=> getOffchainAuthKeys from storage: expired')
      localStorage.removeItem(address)
      return
    }

    return storageRes
  }

  const allSps = await getAllSps()
  const offchainAuthRes =
    await client.offchainauth.genOffChainAuthKeyPairAndUpload(
      {
        sps: allSps,
        chainId: GREEN_CHAIN_ID,
        expirationMs: 5 * 24 * 60 * 60 * 1000,
        domain: window.location.origin,
        address,
      },
      provider
    )

  console.log('offchainAuthRes: ', offchainAuthRes)

  const { code, body: offChainData } = offchainAuthRes
  if (code !== 0 || !offChainData) {
    throw offchainAuthRes
  }

  localStorage.setItem(address, JSON.stringify(offChainData))
  return offChainData
}
