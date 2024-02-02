import * as React from "react";
import { type WalletClient, useWalletClient } from "wagmi";
import { BrowserProvider, JsonRpcSigner } from "ethers";

export function walletClientToSigner(walletClient: WalletClient, type: string) {
    const { account, chain, transport } = walletClient;
    const network = {
        chainId: chain.id,
        name: chain.name,
        ensAddress: chain.contracts?.ensRegistry?.address,
    };
    const provider = new BrowserProvider(transport, network);
    const signer = new JsonRpcSigner(provider, account.address);

    if (type == 'signer')
        return signer;
    return provider;
}

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
    const { data: walletClient } = useWalletClient({ chainId });
    return React.useMemo(
        () => (walletClient ? walletClientToSigner(walletClient, 'signer') : undefined),
        [walletClient]
    );
}

export function useEthersProvider({ chainId }: { chainId?: number } = {}) {
    const { data: walletClient } = useWalletClient({ chainId });
    return React.useMemo(
        () => (walletClient ? walletClientToSigner(walletClient, 'provider') : undefined),
        [walletClient]
    );
}

export const MM_ADDRESS = "0xf4a61225a134eF2c34865b6887c7D857A343A765"
export const ERC20 = "0x8BEc47865aDe3B172A928df8f990Bc7f2A3b9f79"

// "0x5A94802D5488293e982201018fAFa71ed6EB7823" //aurora mainnet
// '0x568E9e2E63d33D64ba3B7318977f731725cfe29D'
// '0xd8420f7941B95297aA7e34B9f6E85D93dC43A8E0'

