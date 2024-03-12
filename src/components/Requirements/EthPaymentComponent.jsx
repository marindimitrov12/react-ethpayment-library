import '../../styles.css';
import React, { useState } from 'react';
export const EthPaymentComponent=()=>{
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
 return(<> <div>
    <h2>Ethereum Payment Checkout</h2>
    <form onSubmit={e => { e.preventDefault(); handlePayment(); }}>
      <div>
        <label>Amount (ETH):</label>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Recipient:</label>
        <input
          type="text"
          value={recipient}
          onChange={e => setRecipient(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Processing...' : 'Pay with Ethereum'}
      </button>
    </form>
    {paymentStatus && (
      <div>
        Payment {paymentStatus === 'success' ? 'successful!' : 'failed.'}
      </div>
    )}
  </div></>);
}