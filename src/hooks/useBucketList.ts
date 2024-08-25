import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { getBucketList } from '@/lib/greenfield'

export interface Bucket {
  operator: string
  offChainStatus: string
  storageSize: string
  createTxHash: string
  updateTxHash: string
  updateTime: number
  updateAt: number
  removed: boolean
  deleteReason: string
  deleteAt: number
  vgf: {
    id: number
    primarySpId: number
    virtualPaymentAddress: string
    globalVirtualGroupIds: string[]
  }
  bucketInfo: {
    id: number
    bucketName: string
    bucketStatus: string
    chargedReadQuota: string
    createAt: number
    globalVirtualGroupFamilyId: number
    owner: string
    paymentAddress: string
    sourceType: string
    spAsDelegatedAgentDisabled: boolean
    visibility: string
    tags: string[]
  }
}

export const useBucketList = () => {
  const [list, setList] = useState<Bucket[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const { address } = useAccount()

  const fetchBucketList = async () => {
    if (!address) return
    setLoading(true)
    getBucketList(address)
      .then(async (result: any) => {
        const { statusCode, body } = result
        if (statusCode == 200 && Array.isArray(body)) {
          const t = body
            .filter((item: any) => !item.removed)
            .map(async (item): Promise<Bucket> => {
              return {
                operator: item.operator,
                offChainStatus: item.off_chain_status,
                storageSize: item.storage_size,
                // Create
                createTxHash: item.create_tx_hash,
                // Update
                updateTxHash: item.update_tx_hash,
                updateTime: item.update_time,
                updateAt: item.update_at,
                // Delete
                removed: item.removed,
                deleteReason: item.delete_reason,
                deleteAt: item.delete_at,
                // Vgf
                vgf: {
                  id: item.vgf.id,
                  primarySpId: item.vgf.primary_sp_id,
                  virtualPaymentAddress: item.vgf.virtual_payment_address,
                  globalVirtualGroupIds: item.vgf.global_virtual_group_ids,
                },
                // BucketInfo
                bucketInfo: {
                  id: item.bucket_info.id,
                  bucketName: item.bucket_info.bucket_name,
                  bucketStatus: item.bucket_info.bucket_status,
                  chargedReadQuota: item.bucket_info.charged_read_quota,
                  createAt: item.bucket_info.create_at,
                  globalVirtualGroupFamilyId:
                    item.bucket_info.global_virtual_group_family_id,
                  owner: item.bucket_info.owner,
                  paymentAddress: item.bucket_info.payment_address,
                  sourceType: item.bucket_info.source_type,
                  spAsDelegatedAgentDisabled:
                    item.bucket_info.sp_as_delegated_agent_disabled,
                  visibility: item.bucket_info.visibility,
                  tags: item.bucket_info.tags,
                },
              }
            })
          const bucketList = await Promise.all(t)
          setList(bucketList)
          console.log(bucketList)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (address) {
      fetchBucketList()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  return {
    loading,
    list,
    fetchBucketList,
  }
}
