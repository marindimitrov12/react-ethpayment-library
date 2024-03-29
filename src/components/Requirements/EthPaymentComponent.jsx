import EthereumLogo from '../../ethereum_logo.png';
import React, { useState,useEffect } from 'react';
import SuccessImg from '../../s4.png';
import FailedImg from '../../s5.png';
import { initializeWeb3 } from './web3Client';

export const EthPaymentComponent=(props)=>{

 
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [currentAccount, setCurrentAccount] = useState('');
  const [allAccounts, setAllAccounts] = useState([]);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [balance, setBalance] = useState('');
  let cssPath='';
  useEffect(() => {  
    props.theme==="dark"?cssPath='./src/style2.css':cssPath='./src/style.css';

      const loadCss = async () => {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = cssPath;
          document.head.appendChild(link);

          return () => {
              document.head.removeChild(link); 
          };
      };
    const initializedWeb3 = async () => {
     
        try {
          
          const {web3,contract}=await initializeWeb3(window.ethereum,props.contractAddress);
          setWeb3(web3);
          setContract(contract);
          const accounts = await web3.eth.getAccounts();
          setCurrentAccount(accounts[0]);
          setAllAccounts(accounts);
        } catch (error) {
          console.error(error);
        }

    };
    const cleanup = loadCss();
      initializedWeb3();
  }, []);
  useEffect(() => {
    if (web3 && currentAccount) {
      getBalance();
    } 
  }, [currentAccount]);

  async function executeContractFunction() {
   
    const amountToSend = await web3.utils.toWei(props.value, 'ether'); 
   
    try {
     
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
  const getBalance = async () => {
    try {
      const result = await web3.eth.getBalance(currentAccount);
      const balanceInEth = web3.utils.fromWei(result, 'ether');
      setBalance(balanceInEth);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };
  
  
 return(<> <div className="container-table100">
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
           className="form-input"
           readOnly
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
           className="form-input"
           required
           readOnly
         />
       </div>
       <div className="form-group">
         <label htmlFor="recipient" className="form-label">Recipient:</label>
         <input
           id="recipient"
           type="text"
           value={props.recipient}
           className="form-input"
           required
           readOnly
         />
       </div>
       <button type="submit" className="submit-button" disabled={loading}>
         {loading ? 'Processing...' : 'Pay with Ethereum'}
       </button>
     </form>
      </div>
      
} 
    </div>
  </div>
</>);
}