// import Image from "next/image";
"use client";
import { NextPage } from "next";
import { FC, ReactNode, useMemo, useState } from "react";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
import BalanceDisplay from "@/pages/balancedisplay";
import { useAtom } from "jotai";
import { balanceAtom, walletAtom } from "@/store/Atom";
import TokenTransfer from "@/pages/transfer";
import TransferUI from "@/pages/transferUI";

export default function Home() {
  // const [walletaddress,setwalletaddress]=useState("crspYfVLVHMvrv22ancHfSrcVhVsRiFhwwMXBRNC5zW");
  const endpoint = clusterApiUrl("devnet");
  const wallets = useMemo(() => [], []);
  // const [walletaddress, setwalletaddress] = useAtom(walletAtom);
  //  setwalletaddress(wallets);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>
          <div className=" flex justify-center items-center p-10">
            <div className="flex-col justify-center items-center flex gap-10">
              <div>

              <WalletMultiButton />
              </div>

              <div className=" text-4xl mb-10">
                Balance: <BalanceDisplay />
              </div>
              <TransferUI/>
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
