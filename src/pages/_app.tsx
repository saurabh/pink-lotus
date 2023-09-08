import { type AppType } from "next/dist/shared/lib/utils";
import { RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';

import "~/styles/globals.css";
import '@rainbow-me/rainbowkit/styles.css';

const MyApp: AppType = ({ Component, pageProps }) => {
  const { chains, publicClient } = configureChains(
    [sepolia],
    [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY || '' })]
  );
  
  const { connectors } = getDefaultWallets({
    appName: 'Baton Finance Challenge',
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '',
    chains
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
  });

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider 
        chains={chains} 
        coolMode 
        showRecentTransactions={true}
        theme={lightTheme({
          accentColor: '#FF007A',
          accentColorForeground: 'white',
          borderRadius: 'none',
          fontStack: 'system',
          overlayBlur: 'small',
        })}
        modalSize="compact"
      >
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default MyApp;
