"use client";  // In Next.js, this is required to prevent the component from being rendered on the server.

import {
  addressEllipsis,
  ConnectButton,
  ErrorCode,
  formatSUI,
  SuiChainId,
  useAccountBalance,
  useWallet
} from "@suiet/wallet-kit";
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import { useMemo } from "react";
import { TransactionBlock } from "@mysten/sui.js";

const sampleNft = new Map([
  ['sui:devnet', '0xe146dbd6d33d7227700328a9421c58ed34546f998acdc42a1d05b4818b49faa2::nft::mint'],
  ['sui:testnet', '0x5ea6aafe995ce6506f07335a40942024106a57f6311cb341239abf2c3ac7b82f::nft::mint'],
  ['sui:mainnet', '0x5b45da03d42b064f5e051741b6fed3b29eb817c7923b83b92f37a1d2abf4fbab::nft::mint'],
])


export default function Home() {
  const wallet = useWallet()
  const { balance } = useAccountBalance();
  const nftContractAddr = useMemo(() => {
    if (!wallet.chain) return '';
    return sampleNft.get(wallet.chain.id) ?? '';
  }, [wallet]);

  function uint8arrayToHex(value: Uint8Array | undefined) {
    if (!value) return ''
    // @ts-ignore
    return value.toString('hex')
  }

  async function handleExecuteMoveCall(target: string | undefined) {
    if (!target) return;

    try {
      const tx = new TransactionBlock()
      tx.moveCall({
        target: target as any,
        arguments: [
          tx.pure('Suiet NFT'),
          tx.pure('Suiet Sample NFT'),
          tx.pure('https://xc6fbqjny4wfkgukliockypoutzhcqwjmlw2gigombpp2ynufaxa.arweave.net/uLxQwS3HLFUailocJWHupPJxQsli7aMgzmBe_WG0KC4')
        ]
      })
      const resData = await wallet.signAndExecuteTransactionBlock({
        transactionBlock: tx,
      });
      console.log('executeMoveCall success', resData);
      alert('executeMoveCall succeeded (see response in the console)');
    } catch (e) {
      console.error('executeMoveCall failed', e);
      alert('executeMoveCall failed (see response in the console)');
    }
  }

  async function handleSignMsg() {
    if (!wallet.account) return
    try {
      const msg = 'Hello world!'
      const msgBytes = new TextEncoder().encode(msg)
      const result = await wallet.signMessage({
        message: msgBytes
      })
      const verifyResult = await wallet.verifySignedMessage(result, wallet.account.publicKey)
      console.log('verify signedMessage', verifyResult)
      if (!verifyResult) {
        alert(`signMessage succeed, but verify signedMessage failed`)
      } else {
        alert(`signMessage succeed, and verify signedMessage succeed!`)
      }
    } catch (e) {
      console.error('signMessage failed', e)
      alert('signMessage failed (see response in the console)')
    }
  }

  const chainName = (chainId: string | undefined) => {
    switch (chainId) {
      case SuiChainId.MAIN_NET:
        return 'Mainnet'
      case SuiChainId.TEST_NET:
        return 'Testnet'
      case SuiChainId.DEV_NET:
        return 'Devnet'
      default:
        return 'Unknown'
    }
  }

  return (
    <main>
      
    </main>
  )
}
