import '../../style.css';
import EthereumLogo from '../../ethereum_logo.png';
import React, { useState,useEffect } from 'react';
import Web3 from 'web3';

export const EthPaymentComponent=()=>{
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  
  const [currentAccount, setCurrentAccount] = useState(null);
  const [allAccounts, setAllAccounts] = useState([]);
  
  useEffect(() => {
    const initializeWeb3 = async () => {
      if (window.ethereum) {
        try {
          // Request account access if needed
          await window.ethereum.enable();

          // Initialize web3
          const web3 = new Web3(window.ethereum);

          // Get current account
          const accounts = await web3.eth.getAccounts();
          setCurrentAccount(accounts[0]);
          setAllAccounts(accounts);
        } catch (error) {
          console.error(error);
        }
      }
    };

    initializeWeb3();
  }, []);


 return(<> 
  <div className="form-container">
      <h2 className="form-heading">
       
        EthPayment Checkout
      </h2>
      <img src={EthereumLogo} alt="Ethereum Logo" className="ethereum-logo" />
      
      <form className="payment-form" onSubmit={e => { e.preventDefault(); handlePayment(); }}>
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