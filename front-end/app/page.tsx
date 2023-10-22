"use client";  // In Next.js, this is required to prevent the component from being rendered on the server.

import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <div className="container-sm p-5">
        <h1 className="mb-3">Welcome</h1>

        <div className="container p-4">
          <h2 className="mb-3">I am...</h2>

          <div className="row">
            <div className="col-sm-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Client</h5>
                  <p className="card-text">Declaration to request a refund following fraudulent use of your credit card.</p>
                  {<Link href="/client" legacyBehavior><a href="" className="btn btn-primary">Start</a></Link>}
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Retailer</h5>
                  <p className="card-text">Request a refund following the fraudulent use of a customer's credit card in my retail store (payment terminal only).</p>
                  {<Link href="/retailer" legacyBehavior><a href="" className="btn btn-primary">Start</a></Link>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
