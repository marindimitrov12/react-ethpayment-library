import React from 'react';

import { EthPaymentComponent } from '../components/Requirements';

export default {
    title: 'Requirements',
    component: EthPaymentComponent,
  };

  export const ExampleStory = () => <EthPaymentComponent 
  contractAddress="0x5FbDB2315678afecb367f032d93F642f64180aa3"
  value="0.1"
  recipient="0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65"/>;
