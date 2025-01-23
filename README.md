
## **TransferUI Component**

This React component provides a simple UI for transferring SPL tokens on the Solana blockchain using the Anchor framework. Below are the key features and functionalities:

### **Features**
1. **Wallet Integration**:
   - Utilizes the `@solana/wallet-adapter-react` package to connect a wallet for sending tokens.
   - Supports checking wallet connection status.

2. **Token Balance Retrieval**:
   - Retrieves and displays the SPL token balance of the sender's wallet.
   - Queries token accounts owned by the sender and decodes their balances using `@solana/spl-token`.

3. **Token Transfer**:
   - Transfers SPL tokens from the sender's wallet to the recipient's wallet.
   - Uses an Anchor program to facilitate the token transfer.
   - Handles decimals to calculate the correct token amount.

4. **Error Handling**:
   - Displays errors and warnings for issues such as disconnected wallets, failed transfers, or invalid inputs.
   - Logs detailed error messages in the browser console.

### **Props and State Management**
- The component uses `useState` for managing input fields such as sender wallet address, recipient wallet address, mint address, and transfer amount.
- Uses `jotai`'s `useAtom` to manage wallet context (`walletAtom`).

### **How It Works**
1. **Connect Wallet**:
   - The sender's wallet must be connected to the Solana devnet.

2. **Set Inputs**:
   - Fill in the sender wallet address, recipient wallet address, token mint address, and the desired transfer amount.

3. **Check Balance**:
   - Displays the balance of the SPL token in the sender's associated token account.

4. **Transfer SPL Tokens**:
   - Calls an Anchor program to perform the token transfer on the Solana blockchain.
   - Automatically calculates the correct associated token accounts (ATAs) for both sender and recipient based on the mint address.

5. **Alert and Log**:
   - Shows an alert upon successful transfer with the transaction signature.
   - Logs the transaction signature and errors (if any) in the browser console.

### **Technologies Used**
- **React** for UI.
- **@solana/web3.js** for Solana blockchain interaction.
- **@project-serum/anchor** for Anchor framework integration.
- **@solana/spl-token** for SPL token account and transfer management.
- **jotai** for state management.

### **Usage**
To use this component:
1. Install the required packages:
   ```bash
   npm install @solana/web3.js @project-serum/anchor @solana/wallet-adapter-react @solana/spl-token jotai
   ```
2. Add the `TransferUI` component to your app.
3. Make sure the Anchor program ID and Solana devnet RPC URL are correctly configured.
![image](https://github.com/user-attachments/assets/80436ea6-9dae-4c70-8d18-cfc803a317b2)
