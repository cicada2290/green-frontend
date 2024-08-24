import { client } from '.'
import type { TxResponse } from '@bnb-chain/greenfield-js-sdk'

export const multiTx = async (params: Pick<TxResponse, 'metaTxInfo'>[]) => {
  return await client.txClient.multiTx(params)
}
