import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import contractABI from '../../../contractAbi.json';
import '../../style.css';
import EthereumLogo from '../../ethereum_logo.png';

export const PaymentEventComponent = (props) => {
    const [loading, setLoading] = useState(true);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const initializeWeb3 = async () => {
            try {
                if (window.ethereum) {
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const initializedWeb3 = new Web3(window.ethereum);
                    const contract = new initializedWeb3.eth.Contract(contractABI.abi, props.contractAddress);
                    const accounts = await initializedWeb3.eth.getAccounts();
                    const result = await contract.methods.getTotalPayments(props.userAddress).call({ from: props.userAddress });
                    const amounts = result[0];
                    const recipients = result[1];
                    const timestamps = result[2];

                    setTransactions(amounts.map((amount, index) => ({
                        recipient: recipients[index],
                        amount: initializedWeb3.utils.fromWei(amount, 'ether'),
                        timestamp: timestamps[index]
                    })));
                    setLoading(false);
                } else {
                    console.error("MetaMask extension not detected");
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        initializeWeb3();
    }, [props.contractAddress, props.userAddress]);
    useEffect(()=>{
      const initializedWeb3=async()=>{
        try{
            if(window.ethereum){
              await window.ethereum.request({ method: 'eth_requestAccounts' });
              const initializedWeb3 = new Web3(window.ethereum);
              const contract = new initializedWeb3.eth.Contract(contractABI.abi, props.contractAddress);
              
              console.log(contract.events);
              try {
                // Get the latest block number
                const latestBlock = await initializedWeb3.eth.getBlockNumber();
        
                // Fetch past events
                const events = await contract.getPastEvents('PaymentReceived', {
                    filter: { _to: props.userAddress},
                    fromBlock: 0,
                    toBlock: latestBlock,
                    
                });
        
                console.log('All past events:', events
                );
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
