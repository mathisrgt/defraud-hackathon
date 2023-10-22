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

import { TransactionBlock } from "@mysten/sui.js";


export default function Home() {
  const wallet = useWallet()

  function uint8arrayToHex(value: Uint8Array | undefined) {
    if (!value) return ''
    // @ts-ignore
    return value.toString('hex')
  }

  async function createFraudTransac() {
    try {
      const tx = new TransactionBlock()
      tx.moveCall({
        target: `${"0x4ebcf88924a28cb1ac30acf41ad824acc3582b7174fb12c221d76340a6ff83f0"}::${"defraud"}::${"create_fraud_transac"}`,
        arguments: [
          tx.pure(11936326),
          tx.pure(7389448),
          tx.pure(49)
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

  async function refund() {
    try {
      const tx = new TransactionBlock()
      tx.moveCall({
        target: `${"0x4ebcf88924a28cb1ac30acf41ad824acc3582b7174fb12c221d76340a6ff83f0"}::${"defraud"}::${"refund"}`,
        arguments: [
          tx.pure(0x4ebcf88924a28cb1ac30acf41ad824acc3582b7174fb12c221d76340a6ff83f0),
          tx.pure(51)
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

  return (
    <main>
      <div className="container-sm p-5">
        <h1 className="mb-3" id="welcomeText">Welcome</h1>

        <div className="container border rounded p-4">
          <div className="container" id="walletConnectionBtnContainer">
            <h2 className="mb-3">Connect your wallet</h2>
            <div className="container p-2">
              <ConnectButton
                onConnectError={(error) => {
                  if (error.code === ErrorCode.WALLET__CONNECT_ERROR__USER_REJECTED) {
                    console.warn('User rejected the connection to ' + error.details?.wallet)
                  } else {
                    console.warn('Unknown connect error: ', error)
                  }
                }}
              />
            </div>
          </div>

          {wallet.connected ? (
            <div className="container mb-4" id="requestsViewerContainer">
              <h2 className="mb-3">My requests</h2>
              <div className="container">
                <table className="table">
                  <thead>
                    <tr className="d-flex">
                      <th scope="col" className="col-2">Obj. Address</th>
                      <th scope="col" className="col-1">Date</th>
                      <th scope="col" className="col-1">Tr. ID</th>
                      <th scope="col" className="col-1">Amount</th>
                      <th scope="col" className="col-2">Seller Address</th>
                      <th scope="col" className="col-1">Bank validation</th>
                      <th scope="col" className="col-1">Police validation</th>
                      <th scope="col" className="col-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="d-flex">
                      <th scope="row" className="col-2 text-truncate">0xa6f8b1a177272832a7412a9b378d300b85eb428874db195d32eb825993094832</th>
                      <td className="col-1">22/10/2023</td>
                      <td className="col-1">11936326</td>
                      <td className="col-1">49.22</td>
                      <td className="col-2">Not attached</td>
                      <td className="col-1">Waiting</td>
                      <td className="col-1">Waiting</td>
                      <td className="col-2">Incomplete</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <h2 className="mb-3">Select transactions</h2>

                <div className="container mb-2">
                  <div className="btn-group">
                    <button type="button" className="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                      Account
                    </button>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="#">72788319 (Checking account)</a></li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li><a className="dropdown-item" href="#">80093829 (Saving account n°1)</a></li>
                      <li><a className="dropdown-item" href="#">83927382 (Saving account n°2)</a></li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li><a className="dropdown-item" href="#">10328937 (Salary account)</a></li>
                    </ul>
                  </div>
                </div>

                <div className="container mb-2">
                  <div className="btn-group">
                    <button type="button" className="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                      Credit card
                    </button>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="#">[Visa] 4652********9815</a></li>
                      <li><a className="dropdown-item" href="#">[Mastercard] 5555********1723</a></li>
                    </ul>
                  </div>
                </div>

                <div className="container">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Transaction</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Currency</th>
                        <th scope="col">Seller</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment method</th>
                        <th scope="col">Select</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">11936326</th>
                        <td>49.22</td>
                        <td>EUR</td>
                        <td>URSSAF</td>
                        <td>21/10/2023</td>
                        <td>Contactless EMV</td>
                        <td><input className="form-check-input" type="checkbox" value="" id="check1" />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">11928320</th>
                        <td>71.93</td>
                        <td>CHF</td>
                        <td>DFF</td>
                        <td>20/10/2023</td>
                        <td>Contactless EMV</td>
                        <td><input className="form-check-input" type="checkbox" value="" id="check2" />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">11839935</th>
                        <td>1585.12</td>
                        <td>USD</td>
                        <td>Coinbase</td>
                        <td>10/10/2023</td>
                        <td>3D Secure</td>
                        <td><input className="form-check-input" type="checkbox" value="" id="check3" /></td>
                      </tr>
                      <tr>
                        <th scope="row">11828929</th>
                        <td>149.00</td>
                        <td>EUR</td>
                        <td>Ledger</td>
                        <td>01/10/2023</td>
                        <td>3D Secure</td>
                        <td><input className="form-check-input" type="checkbox" value="" id="check4" /></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <h2 className="mb-3">Police declaration</h2>
              
              <div className="container mb-4" id="policeDeclarationContainer">
                <div className="container">
                  <div className="row g-3 align-items-center">
                    <div className="col-auto">
                      <label htmlFor="inputDeclarationId" className="col-form-label">Declaration id:</label>
                    </div>
                    <div className="col-auto">
                      <input type="text" id="inputDeclarationId" className="form-control text-uppercase" aria-describedby="passwordHelpInline" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="container" id="submitBtnContainer">
                <div className="form-check mb-3">
                  <input className="form-check-input" type="checkbox" value="7389448" id="certifyCheck"/>
                  <label className="form-check-label" htmlFor="certifyCheck">
                    I certify that I am providing only accurate information.
                  </label>
                </div>
                <button type="button" className="btn btn-primary" id="submitBtn" onClick={createFraudTransac}>Submit</button>
              </div>
            </div>
          ) : (
            <div></div>
          )}

        </div>
      </div>

    </main >
  )
}
