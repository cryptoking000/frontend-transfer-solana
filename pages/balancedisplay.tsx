import { balanceAtom, walletAtom } from "@/store/Atom";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useAtom } from "jotai";
import { FC, useEffect, useState } from "react";

const BalanceDisplay: FC = () => {
  const [balance, setBalance] = useAtom(balanceAtom);
  // const [balance, setBalance] = useState(0);
  const [walletaddress, setwalletaddress] =useAtom(walletAtom);
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  useEffect(() => {
    const updateBalance = async () => {
      if (!connection || !publicKey) {
        console.error("Wallet not connected or connection unavailable");
        return <span></span>;
      }

      try {
        setwalletaddress(publicKey.toString());

        const accountInfo = await connection.getAccountInfo(publicKey);
        console.log(walletaddress);
        if (accountInfo) {
          setBalance(accountInfo.lamports / LAMPORTS_PER_SOL);
        } else {
          throw new Error("Account info not found");
        }
      } catch (error) {
        console.error("Failed to retrieve account info:", error);
      }
    };

    updateBalance();
  }, [connection, publicKey]);

  return <span>{balance || 0} SOL</span>;
  ;
};
export default BalanceDisplay;