"use client";
import React, { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { AnchorProvider, Program, BN } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import idl from "@/idl/token_transfer.json";
import { walletAtom } from "@/store/Atom";
import { useAtom } from "jotai";

import * as anchor from "@project-serum/anchor";
const programId = new PublicKey("ASR2KSdgBuAu9HRJtEEMhrtSXSXVySJFhBzZkx1z57At");

const TransferUI = () => {
  const [from, setFrom] = useAtom (walletAtom);
  // const [from, setFrom] = useState(
  //   "crsBQCJhV9VtZkUwV8G14c8sVH5imN4JnkjJNTiDzD2"
  // );
  const [to, setTo] = useState("crspYfVLVHMvrv22ancHfSrcVhVsRiFhwwMXBRNC5zW");
  const [fromAta, setFromAta] = useState("");
  const [toAta, setToAta] = useState("");
  const [mint, setMint] = useState(
    "4crsg71g2VkMLwwg5L86v5SB2EmLMXHxDzApdh2MnWsS"
  );
  const [amount, setAmount] = useState(100);
  const connection = new anchor.web3.Connection(
    "https://api.devnet.solana.com",
    "confirmed"
    );
    
    const wallet = useWallet();
  const handleTransfer = async () => {
    if (typeof window === "undefined") {
      throw new Error("This function can only run in the browser.");
    }
    if (!wallet.connected) throw new Error("Wallet not connected");
    
    try {
      const { solana } = window as any;
      const provider = new anchor.AnchorProvider(
        connection,
        solana,
        anchor.AnchorProvider.defaultOptions()
      );

      const program = new Program(idl as any, programId, provider);
      const fromAta = getAssociatedTokenAddressSync(
        new PublicKey(mint),
        new PublicKey(from),
        true,
        TOKEN_PROGRAM_ID
        );
        const toAta = getAssociatedTokenAddressSync(
          new PublicKey(mint),
        new PublicKey(to),
        true,
        TOKEN_PROGRAM_ID
        );
        setFromAta(fromAta.toString());
        setToAta(toAta.toString());
        // const mint1 =new anchor.BN(amount * 10 ** 6);

        const balance = await connection.getTokenAccountBalance(fromAta);
        console.log("Balance:", balance.value.amount);

        console.log(fromAta.toString(),toAta.toString(),from, to,  amount);
      // console.log(TOKEN_PROGRAM_ID.toString());
        // console.log("From:", from);
        // console.log("Wallet Public Key:", wallet.publicKey.toString());
       const tx = await program.methods
        .transferSplTokens(new anchor.BN(amount * 10 ** 6))
        .accounts({
          fromAta: fromAta,
          toAta: toAta,

          from: new PublicKey(from),
          mint: new PublicKey(mint),
          receiver: new PublicKey(to),
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        // .signers([])
        // .signers([solana.wallet.adapter])
        .rpc();
       

      alert(`Transfer successful! Transaction: ${tx}`);
      console.log("Transaction signature:", tx);
    } catch (error) {
      alert(`Transfer failed. Check console for details.${error}`);
      console.error("Error transferring tokens:", error);
    }
  };

  return (
    <div className="flex flex-col text-[20px] items-center gap-5">
      <div className="flex w-full justify-between gap-2">
        <label>Sender Wallet Address:</label>
        <input
          type="text"
          className="text-blue-700 border-2 px-2 border-gray-700"
          value={from || ""}
          onChange={(e) => setFrom(e.target.value)}
          placeholder="Sender Wallet Address"
        />
      </div>
      <div className="flex w-full justify-between gap-2">
        <label>Sender ATA:</label>
        <input
          type="text"
          className="text-blue-700 border-2 px-2 border-gray-700"
          value={fromAta || ""}
          readOnly
          // onChange={(e) => setFrom(e.target.value)}
          placeholder="Sender Wallet Address"
        />
      </div>
      <div className="flex w-full justify-between gap-2">
        <label>Recipient ATA:</label>
        <input
          type="text"
          className="text-blue-700 border-2 px-2 border-gray-700"
          value={toAta || ""}
          readOnly
          // onChange={(e) => setFrom(e.target.value)}
          placeholder="Sender Wallet Address"
        />
      </div>
      <div className="flex w-full justify-between gap-2">
        <label>Recipient Wallet Address:</label>
        <input
          type="text"
          className="text-blue-700 border-2 px-2 border-gray-700"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="Recipient Wallet Address"
        />
      </div>
      <div className="flex w-full justify-between gap-2">
        <label>Mint Address:</label>
        <input
          type="text"
          className="text-blue-700 border-2 px-2 border-gray-700"
          value={mint}
          onChange={(e) => setMint(e.target.value)}
          placeholder="Token Mint Address"
        />
      </div>
      <div className="flex w-full justify-between gap-2">
        <label>Amount:</label>
        <input
          type="number"
          className="text-blue-700 border-2 px-2 border-gray-700"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Amount"
        />
      </div>
      <button
        className="border-2 rounded-lg p-3 w-full bg-blue-700"
        onClick={handleTransfer}
      >
        Transfer
      </button>
    </div>
  );
};

export default TransferUI;
