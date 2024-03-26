import React from 'react';
import {PaymentEventComponent}from'../components/Requirements/PaymentEventComponent ';

export default {
    title: 'Requirements',
    component: PaymentEventComponent,
  };
  export const MyStory = () => <PaymentEventComponent 
  contractAddress="0x1696C7203769A71c97Ca725d42b13270ee493526"
  userAddress="0x14dC79964da2C08b23698B3D3cc7Ca32193d9955"/>;