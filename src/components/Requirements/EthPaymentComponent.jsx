import '../../style.css';
import EthereumLogo from '../../ethereum_logo.png';
import React, { useState } from 'react';
export const EthPaymentComponent=()=>{
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
 return(<> 
  <div className="form-container">
      <h2 className="form-heading">
       
        EthPayment Checkout
      </h2>
      <img src={EthereumLogo} alt="Ethereum Logo" className="ethereum-logo" />
      <form className="payment-form" onSubmit={e => { e.preventDefault(); handlePayment(); }}>
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