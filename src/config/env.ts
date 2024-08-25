export const GRPC_URL = process.env.NEXT_PUBLIC_GRPC_URL || ''
export const GREENFIELD_RPC_URL = process.env.NEXT_PUBLIC_GREENFIELD_RPC_URL
export const GREEN_CHAIN_ID = parseInt(
  process.env.NEXT_PUBLIC_GREEN_CHAIN_ID || '0'
)
export const BSC_RPC_URL = process.env.NEXT_PUBLIC_BSC_RPC_URL || ''
export const BSC_CHAIN_ID = parseInt(
  process.env.NEXT_PUBLIC_BSC_CHAIN_ID || '0'
)

export const GREEBFIELD_SCAN_URL =
  process.env.NEXT_PUBLIC_GREENFIELD_SCAN_URL ||
  'https://testnet.greenfieldscan.com'
