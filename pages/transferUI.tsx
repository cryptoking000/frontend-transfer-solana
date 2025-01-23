"use client";
import React, { useState } from "react";
import { WalletContextState, useConnection, useWallet } from "@solana/wallet-adapter-react";
import { AnchorProvider, Program, BN } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { AccountLayout, TOKEN_PROGRAM_ID, getAssociatedTokenAddressSync } from "@solana/spl-token";
import idl from "@/idl/token_transfer.json";
import { walletAtom } from "@/store/Atom";
import { useAtom } from "jotai";
import * as anchor from "@project-serum/anchor";
const programId = new PublicKey("ASR2KSdgBuAu9HRJtEEMhrtSXSXVySJFhBzZkx1z57At");
const decimals = 6;
const TransferUI = () => {
  const [from, setFrom] = useAtom(walletAtom);
  const [to, setTo] = useState("crspYfVLVHMvrv22ancHfSrcVhVsRiFhwwMXBRNC5zW");
  const [mint, setMint] = useState("4crsg71g2VkMLwwg5L86v5SB2EmLMXHxDzApdh2MnWsS");
  const [amount, setAmount] = useState(100);
  const [spltokenamount, setSpltokenamount] = useState("");

  const connection = new anchor.web3.Connection("https://api.devnet.solana.com", "confirmed");
  const wallet = useWallet() as any;

  const handleTransfer = async () => {
    if (!wallet.connected) throw new Error("Wallet not connected");

    try {
////////////////////////////////////////////////////////////
      const tokenAccounts = await connection.getTokenAccountsByOwner(
        new PublicKey(from), 
        {
          programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"), // SPL Token Program ID
        }
      );
      tokenAccounts.value.forEach(({ account }) => {
        const accountInfo = AccountLayout.decode(account.data);
        setSpltokenamount(accountInfo.amount.toString());
      });
////////////////////////////////////////////////////////
      const provider = new AnchorProvider(connection, wallet, AnchorProvider.defaultOptions());
      const program = new Program(idl as any, programId, provider);

      const tx = await program.methods
        .transferSplTokens(new BN(amount * 10 **decimals))
        .accounts({
          fromAta: getAssociatedTokenAddressSync(new PublicKey(mint), new PublicKey(from)),
          toAta: getAssociatedTokenAddressSync(new PublicKey(mint), new PublicKey(to)),
          from: new PublicKey(from),
          mint: new PublicKey(mint),
          receiver: new PublicKey(to),
          tokenProgram: TOKEN_PROGRAM_ID,
        })
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
      <h3 className="text-2xl">SPL token Balance: {spltokenamount}</h3>
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
      <button className="border-2 rounded-lg p-3 w-full bg-blue-700" onClick={handleTransfer}>
        Transfer
      </button>
    </div>
  );
};

export default TransferUI;
