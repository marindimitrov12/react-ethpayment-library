import React from 'react';

import { EthPaymentComponent } from '../components/Requirements';

export default {
    title: 'Requirements',
    component: EthPaymentComponent,
  };

  export const ExampleStory = () => <EthPaymentComponent 
  contractAddress="0x1696C7203769A71c97Ca725d42b13270ee493526"
  value="0.1"
  recipient="0x14dC79964da2C08b23698B3D3cc7Ca32193d9955"/>;
