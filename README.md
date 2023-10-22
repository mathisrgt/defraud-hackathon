# defraud
Decentralized application on the Sui blockchain designed to improve the process of reporting fraudulent transactions. Developed during the Sui x BSA hackathon.

# Initialization
- init
- create_bank_cap
- create_police_cap

- create_fraud_transac (call by the client)
- edit_claim_id (opt)


# Client track no. 1
- validate_by_police
- validate_with_bank
- refund
- claim_from_bank

# Client track no. 2
- refund (by the retailer)
- claim_from_retailer (object now own by the retailer)
- validate_by_police
- validate_with_bank
- claim_from_bank


# Example on the DevNet
Owner: 0xbbae94c55c0560408e9046f24b443d7ae60928b851fcdf6226501b76831ac754

AdminCap:
0xa8e6e119dc8e301754fab3b263ba12b78aa9767b5a4ba96a9592bbdc0e887b15

Object Address:
0x4ebcf88924a28cb1ac30acf41ad824acc3582b7174fb12c221d76340a6ff83f0

Fraud Transac Object:
0x34a34ded1033d07f2e31f9d17510426f05d781f718d18d7fad1274f5da6a72ee
