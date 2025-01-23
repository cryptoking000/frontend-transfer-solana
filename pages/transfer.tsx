"use client";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { AnchorProvider, Program ,BN} from "@project-serum/anchor";
import { WalletContextState } from "@solana/wallet-adapter-react";
import *as spl from "@solana/spl-token";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import idl from "@/idl/token_transfer.json";
const programId = new PublicKey("GFM5htFDYr9R6TZDpW2pHitU5RGCBjdk9XeNG1vtpYt");
const preflightCommitment = "processed";

const TokenTransfer = async(
  from: PublicKey,
  to: PublicKey,
  mint: PublicKey,
  amount: number
) =>{
    const { connection } = useConnection();
    const wallet = useWallet();
    
    try {
        // if (!wallet.connected) throw new Error("Wallet not connected");
        const { solana } = window as any;
        // if (!solana || !solana.isPhantom) {
        //     throw new Error("Solana wallet not found. Please install Phantom or another compatible wallet.");
        //   }
    const provider = new AnchorProvider(
      connection,
      solana,
      AnchorProvider.defaultOptions()
    );

    const program = new Program(idl as any, programId, provider);

    const tx = await program.methods
      .transferSplTokens(new BN(amount))
      .accounts({
        from,
        mint,
        to,
        tokenProgram: programId,
      })
      .rpc();
    console.log("Transaction signature:", tx);
    return tx;
  } catch (error) {

    console.log("👋✔✔👋Error transferring tokens:", error);
    throw error;
  }
}
export default TokenTransfer;

