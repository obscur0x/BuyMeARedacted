import "@rainbow-me/rainbowkit/styles.css";
import {
  ConnectButton,
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import Profile from "../components/profile";
import { Inputs } from "../components/transaction";




import { useState } from "react";

const { chains, provider } = configureChains(
  [chain.arbitrum],
  [alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function IndexPage() {
  const [redacted, setRedacted] = useState("{Redacted}");


  return (
    <div class="font-Poppins">
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <div className="h-screen w-screen flex items-center justify-center bg-gray-200">
            <div>
              <div className="mb-10">
                <h1 className="text-3xl text-center font-bold text-gray-800 mb-4">
                  Buy Lucas a {redacted}
                </h1>
                <p className="font-light text-gray-500 md:w-[600px] w-full px-4 text-center text-sm">
                  I don't really drink coffee so I'll let you pick and choose
                  what you want me to spend your fake internet money on.
                </p>
                <Profile />
              </div>
              <div className="bg-gray-100 p-4 rounded-xl shadow-md mx-4">
                <Inputs redacted={redacted} setRedacted={setRedacted} />
                <ConnectButton.Custom>
                  {({
                    account,
                    chain,
                    openAccountModal,
                    openChainModal,
                    openConnectModal,
                    authenticationStatus,
                    mounted,
                  }) => {
                    // Note: If your app doesn't use authentication, you
                    // can remove all 'authenticationStatus' checks
                    const ready = mounted && authenticationStatus !== "loading";
                    const connected =
                      ready &&
                      account &&
                      chain &&
                      (!authenticationStatus ||
                        authenticationStatus === "authenticated");

                    return (
                      <div>
                        {(() => {
                          if (!connected) {
                            return (
                              <button
                                onClick={openConnectModal}
                                type="button"
                                className="w-full bg-blue-600 py-2 rounded-xl "
                              >
                                Connect Wallet
                              </button>
                            );
                          }

                          if (chain.unsupported) {
                            return (
                              <button onClick={openChainModal} type="button">
                                Wrong network
                              </button>
                            );
                          }

                          return <div></div>;
                        })()}
                      </div>
                    );
                  }}
                </ConnectButton.Custom>
              </div>
              <div className="mt-4  mx-4 md:mx-0 text-center">
                <span className="text-gray-400 font-italic  md:w-[600px] text-xs">
                  Note: All of this information will be stored on-chain meaning
                  it will be publicly available for everyone to read
                </span>
              </div>
              <div className="text-center text-gray-400 underline text-xs absolute bottom-5 inset-x-0">
                <div className="flex items-center justify-center space-x-5">
                  <a
                    href="https://arbiscan.io/address/0x9c9F8A8E8D6aA127608e2D3d1A70F5B7F0e68427"
                    target="_blank"
                  >
                    Contract
                  </a>
                  <a
                    href="https://arbiscan.io/address/0x9c9F8A8E8D6aA127608e2D3d1A70F5B7F0e68427"
                    target="_blank"
                  >
                    Github
                  </a>
                </div>
              </div>
            </div>
          </div>
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}
