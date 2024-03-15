import '../../style.css';
import EthereumLogo from '../../ethereum_logo.png';
import React, { useState,useEffect } from 'react';
import Web3 from 'web3';
import contractABI from '../../../contractAbi.json';

export const EthPaymentComponent=()=>{
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';//chage
  const [currentAccount, setCurrentAccount] = useState(null);
  const [allAccounts, setAllAccounts] = useState([]);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  
  useEffect(() => {  
    const initializeWeb3 = async () => {
      if (window.ethereum) {
        try {
          // Request account access if needed
          await window.ethereum.request({ method: 'eth_requestAccounts' });

          // Initialize web3
          const initializedWeb3 = new Web3(window.ethereum);
          setWeb3(initializedWeb3);
           console.log(web3);
           const contract = new initializedWeb3.eth.Contract(contractABI.abi, contractAddress);
            setContract(contract);
          // Get current account 
          const accounts = await initializedWeb3.eth.getAccounts();
          setCurrentAccount(accounts[0]);
          setAllAccounts(accounts);
        } catch (error) {
          console.error(error);
        }
      }
      else {
        console.error("MetaMask extension not detected");
    }
    };

      initializeWeb3();
  }, []);

  async function executeContractFunction() {
   
    const amountToSend = await web3.utils.toWei('0.1', 'ether'); // Convert 0.1 ETH to wei
   
    try {
      // Execute contract function
      const result = await contract.methods.makePayment('0xa0Ee7A142d267C1f36714E4a8F75612F20a79720').send({ from: currentAccount,
      value: amountToSend});
  
      console.log('Transaction successful:', result);
    } catch (error) {
      console.error('Error executing contract function:', error);
    }
  }
 return(<> 
  <div className="form-container">
      <h2 className="form-heading">
       
        EthPayment Checkout
      </h2>
      <img src={EthereumLogo} alt="Ethereum Logo" className="ethereum-logo" />
      
      <form className="payment-form" onSubmit={e => { e.preventDefault();executeContractFunction(); }}>
      <div className="select-container">
          <label htmlFor="account" className="form-label">Account :</label>
          <select className="form-input" onChange={(e)=>{
            setCurrentAccount(e.target.value);
           
          }}>
            {allAccounts.map((account,index)=>(
              <option key={index} value={account}>{account}</option>
            ))}
             
          </select>
        
        </div>
        <div className="form-group">
          <label htmlFor="amount" className="form-label">Amount (ETH):</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="recipient" className="form-label">Recipient:</label>
          <input
            id="recipient"
            type="text"
            value={recipient}
            onChange={e => setRecipient(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Processing...' : 'Pay with Ethereum'}
        </button>
      </form>
      {paymentStatus && (
        <div className="payment-status">
          Payment {paymentStatus === 'success' ? 'successful!' : 'failed.'}
        </div>
      )}
    </div>
</>);
}