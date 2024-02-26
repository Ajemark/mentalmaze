import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useEnsName } from "wagmi";

const CustomButton = () => {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });

  const { open } = useWeb3Modal();

  console.log(isConnected);
  return (
    <div
      className="flex cursor-pointer text-white bg-blue-50  w-fit h-[38px] items-center rounded-[8px] gap-[8px] px-[12px]"
      onClick={() => open()}
    >
      {address ? (
        <div>
          {ensName
            ? `${ensName} (${address})`
            : `${address.slice(0, 4)}...${address.slice(
                address.length - 4,
                address.length
              )}`}
        </div>
      ) : (
        <div> Connect Wallet</div>
      )}
    </div>
  );
};

export default CustomButton;
