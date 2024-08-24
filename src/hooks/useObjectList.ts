import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { getObjectList } from '@/lib/greenfield'
import { version } from 'os'

export const useObjectList = (bucketName: string) => {
  const [list, setList] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const { address } = useAccount()

  useEffect(() => {
    if (address) {
      setLoading(true)
      getObjectList(bucketName)
        .then(async (result: any) => {
          console.log(
            'result: ',
            result.gf_sp_list_objects_by_bucket_name_response
          )
          const { statusCode, body } = result
          if (
            statusCode == 200 &&
            Array.isArray(
              body.gf_sp_list_objects_by_bucket_name_response.objects
            )
          ) {
            const t =
              body.gf_sp_list_objects_by_bucket_name_response.objects.map(
                (item: any) => {
                  return {
                    operator: item.operator,
                    lockedaBlance: item.locked_balance,
                    sealTxHash: item.seal_tx_hash,
                    // Create
                    createTxHash: item.create_tx_hash,
                    // Update
                    updateTxHash: item.update_tx_hash,
                    updateAt: item.update_at,
                    // Delete
                    removed: item.removed,
                    deleteReason: item.delete_reason,
                    deleteAt: item.delete_at,
                    // ObjectInfo
                    objectInfo: {
                      createAt: item.object_info.create_at,
                      bucketName: item.object_info.bucket_name,
                      checksums: item.object_info.checksums,
                      contentType: item.object_info.content_type,
                      creator: item.object_info.creator,
                      id: item.object_info.id,
                      isUpdating: item.object_info.is_updating,
                      localVirtualGroupId:
                        item.object_info.local_virtual_group_id,
                      objectName: item.object_info.object_name,
                      objectStatus: item.object_info.object_status,
                      owner: item.object_info.owner,
                      payloadSize: item.object_info.payload_size,
                      redundancyType: item.object_info.redundancy_type,
                      sourceType: item.object_info.source_type,
                      tags: item.object_info.tags,
                      updatedAt: item.object_info.updated_at,
                      updatedBy: item.object_info.updated_by,
                      version: item.object_info.version,
                      visibility: item.object_info.visibility,
                    },
                  }
                }
              )
            const objectList = await Promise.all(t)
            setList(objectList)
            console.log(objectList)
          }
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [address])

  return {
    loading,
    list,
  }
}
