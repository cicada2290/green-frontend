'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'

import { config } from '@/lib/wagmi'
import {
  DynamicContextProvider,
  EthereumWalletConnectors,
  DynamicWagmiConnector,
} from '@/lib/dynamic'

const queryClient = new QueryClient()

const evmNetworks = [
  {
    blockExplorerUrls: ['https://testnet.bscscan.com/'],
    chainId: 97,
    chainName: 'BNB Smart Chain Testnet',
    iconUrls: ['https://cryptologos.cc/logos/binance-coin-bnb-logo.png'],
    name: 'BNB Smart Chain Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'BNB',
      symbol: 'tBNB',
    },
    networkId: 97,

    rpcUrls: [
      'https://bsc-testnet.nodereal.io/v1/e9a36765eb8a40b9bd12e680a1fd2bc5',
    ],
    vanityName: 'BNB Testnet',
  },
]

const DynamicProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: 'b4a79b14-9a41-4dbe-8425-174c937951eb',
        walletConnectors: [EthereumWalletConnectors],
        overrides: { evmNetworks },
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  )
}

export default DynamicProvider
