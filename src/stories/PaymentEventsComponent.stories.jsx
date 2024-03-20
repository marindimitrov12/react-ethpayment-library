import React from 'react';
import {PaymentEventComponent}from'../components/Requirements/PaymentEventComponent ';

export default {
    title: 'Requirements',
    component: PaymentEventComponent,
  };
  export const MyStory = () => <PaymentEventComponent 
  contractAddress="0x5FbDB2315678afecb367f032d93F642f64180aa3"
  userAddress="0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"/>;