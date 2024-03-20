import '../../style.css';
import EthereumLogo from '../../ethereum_logo.png';
import React, { useState,useEffect } from 'react';
import Web3 from 'web3';
import contractABI from '../../../contractAbi.json';
import SuccessImg from '../../s4.png';
import FailedImg from '../../s5.png';

export const EthPaymentComponent=(props)=>{

 
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [currentAccount, setCurrentAccount] = useState('');
  const [allAccounts, setAllAccounts] = useState([]);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [balance, setBalance] = useState('');
  
  useEffect(() => {  
    const initializeWeb3 = async () => {
      if (window.ethereum) {
        try {
          // Request account access if needed
          await window.ethereum.request({ method: 'eth_requestAccounts' });

          // Initialize web3
          const initializedWeb3 = new Web3(window.ethereum);
          setWeb3(initializedWeb3);
           
           const contract = new initializedWeb3.eth.Contract(contractABI.abi, props.contractAddress);
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
  useEffect(() => {
    if (web3 && currentAccount) {
      getBalance();
    } // Call getBalance() whenever currentAccount changes
  }, [currentAccount]);

  async function executeContractFunction() {
   
    const amountToSend = await web3.utils.toWei(props.value, 'ether'); // Convert 0.1 ETH to wei
   
    try {
      // Execute contract function
      const result = await contract.methods.makePayment(props.recipient).send({ from: currentAccount,
      value: amountToSend});
      setLoading(true);
      setPaymentStatus(true);
      console.log('Transaction successful:', result);
    } catch (error) {
      console.error('Error executing contract function:', error);
      setLoading(false);
      setPaymentStatus(false);
     
    }
  }
  const getBalance=async()=>{ 
     // Get the balance of the account
    
     web3.eth.getBalance(currentAccount)
     .then((result) => {
       // Convert balance from wei to ether
       const balanceInEth = web3.utils.fromWei(result, 'ether');
       setBalance(balanceInEth);
     })
     .catch((error) => {
       console.error("Error fetching balance:", error);
     });
  }
  
 return(<> 
  <div className="form-container">
  {loading? paymentStatus?<div className="success-container">
    <img src={SuccessImg}  className="checkmark"/>
    <p className="message">Payment Successful!</p>
    
  </div>:<div className="success-container">
    <img src={FailedImg}  className="checkmark"/>
    <p className="messageFailed">Payment Failed!</p>
    
  </div>:
      <div>
        <h2 className="form-heading">
       
       EthPayment Checkout
     </h2>
     
     <img src={EthereumLogo} alt="Ethereum Logo" className="ethereum-logo" />
     
     <form className="payment-form" onSubmit={e => { e.preventDefault();executeContractFunction(); }}>
     <div className="form-group">
         <label htmlFor="amount" className="form-label">Balance:</label>
         <input
           id="amount"
           type="number"
           value={balance}
           onChange={e => setAmount(e.target.value)}
           className="form-input"
           
         />
       </div>
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
           value={props.value}
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
           value={props.recipient}
           onChange={e => setRecipient(e.target.value)}
           className="form-input"
           required
         />
       </div>
       <button type="submit" className="submit-button" disabled={loading}>
         {loading ? 'Processing...' : 'Pay with Ethereum'}
       </button>
     </form>
      </div>
      
}
      
    </div>
</>);
}