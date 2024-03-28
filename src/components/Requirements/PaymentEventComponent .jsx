import React, { useState, useEffect } from 'react';
import EthereumLogo from '../../ethereum_logo.png';
import {initializeWeb3}from'./web3Client'

export const PaymentEventComponent = (props) => {
    const [loading, setLoading] = useState(true);
    const [transactions, setTransactions] = useState([]);
    let cssPath='';

    useEffect(()=>{
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
      const initializedWeb3=async()=>{
       const {web3,contract}=await initializeWeb3(window.ethereum,props.contractAddress);
    
       try{
       const latestBlock = await web3.eth.getBlockNumber();
       const events = await contract.getPastEvents('PaymentReceived', {
                    filter: { _to: props.userAddress},
                    fromBlock: 0,
                    toBlock: latestBlock,
                    
                });
               setTransactions(events.map((amount, index) => ({
                  recipient: events[index].returnValues[0] ,
                  amount: web3.utils.fromWei(events[index].returnValues[2] , 'ether'),
                  timestamp: events[index].returnValues[3] 
              })));
              setLoading(false);
            }  
             catch (error) {
                console.error('Error fetching past events:', error);
            }

            }
            const cleanup = loadCss();
      initializedWeb3();
    
    },[]);
     
    return (
        <div className="container-table100">
          <div className="table-container">
            {loading ? <h1>Loading...</h1> :
                <div>
                    <h1 className="form-payment-history">Transaction History:</h1>
                    <img src={EthereumLogo} alt="Ethereum Logo" className="ethereum-logo-2" />
                    <table className='table-container'>
                        <thead>
                            <tr className='table100-head'>
                                <th>Recipient</th>
                                <th>Amount</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction, index) => (
                                <tr key={index}>
                                    <td>{transaction.recipient}</td>
                                    <td>{transaction.amount}</td>
                                    <td>{transaction.timestamp}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </div>
        </div>
    );
};
