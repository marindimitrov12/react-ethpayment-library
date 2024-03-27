import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import contractABI from '../../../contractAbi.json';
import '../../style.css';
import EthereumLogo from '../../ethereum_logo.png';

export const PaymentEventComponent = (props) => {
    const [loading, setLoading] = useState(true);
    const [transactions, setTransactions] = useState([]);

   
    useEffect(()=>{
      const initializedWeb3=async()=>{
        try{
            if(window.ethereum){
              await window.ethereum.request({ method: 'eth_requestAccounts' });
              const initializedWeb3 = new Web3(window.ethereum);
              const contract = new initializedWeb3.eth.Contract(contractABI.abi, props.contractAddress);
              
              console.log(contract.events);
              try {
               
                const latestBlock = await initializedWeb3.eth.getBlockNumber();
        
                
                const events = await contract.getPastEvents('PaymentReceived', {
                    filter: { _to: props.userAddress},
                    fromBlock: 0,
                    toBlock: latestBlock,
                    
                });
               
               
                setTransactions(events.map((amount, index) => ({
                  recipient: events[index].returnValues[0] ,
                  amount: initializedWeb3.utils.fromWei(events[index].returnValues[2] , 'ether'),
                  timestamp: events[index].returnValues[3] 
              })));
              setLoading(false);

                
            } catch (error) {
                console.error('Error fetching past events:', error);
            }

            }
        }
        catch(error){
            console.log(error);
        }
      }
      initializedWeb3();
    },[]);
     console.log(transactions);
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
