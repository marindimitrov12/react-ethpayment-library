import React from 'react';
import {PaymentEventComponent}from'../components/Requirements/PaymentEventComponent ';

export default {
    title: 'Requirements',
    component: PaymentEventComponent,
  };
  export const MyStory = () => <PaymentEventComponent 
  contractAddress="0xef11D1c2aA48826D4c41e54ab82D1Ff5Ad8A64Ca"
  userAddress="0x14dC79964da2C08b23698B3D3cc7Ca32193d9955"/>;