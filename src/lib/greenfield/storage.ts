import { client } from '.'
import type { MsgSetTag } from '@bnb-chain/greenfield-cosmos-types/greenfield/storage/tx'

export const setTag = (params: MsgSetTag) => {
  return client.storage.setTag(params)
}
