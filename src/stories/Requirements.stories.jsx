import React from 'react';

import { EthPaymentComponent } from '../components/Requirements';

export default {
    title: 'Requirements',
    component: EthPaymentComponent,
  };

  export const ExampleStory = () => <EthPaymentComponent 
  contractAddress="0xef11D1c2aA48826D4c41e54ab82D1Ff5Ad8A64Ca"
  value="0.1"
  recipient="0x14dC79964da2C08b23698B3D3cc7Ca32193d9955"/>;
