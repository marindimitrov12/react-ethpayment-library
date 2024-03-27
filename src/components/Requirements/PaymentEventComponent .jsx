import React, { useState, useEffect } from 'react';
import '../../style.css';
import EthereumLogo from '../../ethereum_logo.png';
import {initializeWeb3}from'./web3Client'

export const PaymentEventComponent = (props) => {
    const [loading, setLoading] = useState(true);
    const [transactions, setTransactions] = useState([]);

   
    useEffect(()=>{
      const initializedWeb3=async()=>{
       const {web3,contract}=await initializeWeb3(window.ethereum,props.contractAddress);
       console.log(web3);
       console.log(contract);
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
      
      initializedWeb3();
    },[]);
     
    return (
        <div className="table-container">
            {loading ? <h1>Loading...</h1> :
                <div>
                    <h1 className="form-payment-history">Transaction History:</h1>
                    <img src={EthereumLogo} alt="Ethereum Logo" className="ethereum-logo-2" />
                    <table>
                        <thead>
                            <tr>
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
    );
};
