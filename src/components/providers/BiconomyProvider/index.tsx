"use client";

import { BiconomyProvider as BaseBiconomyProvider } from "@biconomy/use-aa";
import { WagmiProvider } from "wagmi";
import { config } from "@/lib/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const BiconomyProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const biconomyPaymasterApiKey =
    process.env.NEXT_PUBLIC_PAYMASTER_API_KEY || "FGMXAEGE5.248aeaf3-4af7-4cec-ae5f-fe60fba0c35c";
  const bundlerUrl = process.env.NEXT_PUBLIC_BUNDLER_URL || "";

 
  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <BaseBiconomyProvider
          config={{
            biconomyPaymasterApiKey,
            bundlerUrl,
          }}
          queryClient={queryClient}
        >
          {children}
        </BaseBiconomyProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default BiconomyProvider;
