import React from 'react';

import { EthPaymentComponent } from '../components/Requirements';

export default {
    title: 'Requirements',
    component: EthPaymentComponent,
  };

  export const ExampleStory = () => <EthPaymentComponent 
  contractAddress="0x332Fb35767182F8ac9F9C1405db626105F6694E0"
  value="0.1"
  recipient="0x14dC79964da2C08b23698B3D3cc7Ca32193d9955"
  userCssPath ='./src/style2.css'
  theme ="dark"/>;
