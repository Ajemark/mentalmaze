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

export const MM_ADDRESS = '0x12548836Fbb957109659665B1622CEDe1069B050'

