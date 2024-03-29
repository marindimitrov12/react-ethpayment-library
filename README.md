# Ethereum Payment React Component Library

Welcome to the Ethereum Payment React Component Library! This library provides a set of easy-to-use React components for seamlessly integrating Ethereum payments into your projects. Whether you're building a decentralized application (dApp), a web platform, or any other Ethereum-based project, this library simplifies the process of accepting Ether payments.

## Features

- **Ready-to-Use Components**: Start accepting Ethereum payments instantly with our pre-built React components.
- **Customizable**: Easily customize the appearance and behavior of payment components to match your project's design.
- **Secure Integration**: Utilize secure payment handling mechanisms backed by Solidity smart contracts.
- **Error Handling**: Comprehensive error handling ensures smooth payment processing and enhances user experience.

## Getting Started

### Installation

Before using the library you should install metaMask extension in your browser!!!

Install the Ethereum Payment React Component Library via npm:

```bash
 npm i react-ethpayment-library
```
###


# Usage
1. Import the desired components into your React application:

````javascript
import { EtherPaymentComponent, PaymentEventComponent } from 'ethereum-payment-library';
````
2. Use the components within your application's UI:

````javascript
<EthPaymentComponent contractAddress={yourContractAddress} recipient={yourRecipientAddress} value={paymentAmount}
 theme={dark} > //for dark
<EthPaymentComponent />

<PaymentEventComponent contractAddress={yourContractAddress} userAddress={yourRecipientAddress} theme={''} > //for light
<PaymentEventComponent />

````
# Documentation

## Components

EtherPayment Component:
This component enables users to make Ethereum payments to a specified recipient.

- **Props**:
  - **recipientAddress**:(string): Ethereum address of the payment recipient.
  - **value**: Amount of Ether to be sent in the payment.
  - **contractAddress**: The address of the contract that we want to use.
  - **theme**: Dark or Light

PaymentEvent Component:
This component displays the history of Ethereum payments made by the current user.

- **Props**:
  - **contractAddress**: The address of the contract that we want to use.
  - **userAddress**: The address of the recipient that we want to use.
  - **theme**: Dark or Light

# Design
![image](https://github.com/marindimitrov12/react-ethpayment-library/assets/63950527/2e4a4352-b708-459b-971d-17e32b1d7be1)

![image](https://github.com/marindimitrov12/react-ethpayment-library/assets/63950527/d2131bd4-84a2-4314-909c-2dd8b9b874f6)

![image](https://github.com/marindimitrov12/react-ethpayment-library/assets/63950527/59d82fc1-2994-4621-bc33-ca1b43a04349)

![image](https://github.com/marindimitrov12/react-ethpayment-library/assets/63950527/26311dde-bc3b-415b-8344-7549ee702278)





# Contributing

We welcome contributions from the community! Feel free to submit bug reports, feature requests, or pull requests to help improve this library.

# License
This project is licensed under the MIT License - see the LICENSE file for details.
