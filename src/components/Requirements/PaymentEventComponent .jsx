import React,{useState,useEffect} from 'react';
import Web3 from 'web3';
import contractABI from '../../../contractAbi.json';

export const PaymentEventComponent=(props)=>{
 
    const [paymentEvents, setPaymentEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [contract, setContract] = useState(null);
    const [web3, setWeb3] = useState(null);

    useEffect(()=>{
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
                  const eventName = 'PaymentReceived';
                   // Query past events
                  const events = await contract.getPastEvents(eventName, {
                   fromBlock: 0, // Start block (default: 0)
                   toBlock: 'latest' // End block (default: 'latest')
          },function(error, events){ console.log(events); });
                // Set payment events in state
                console.log(events);
                setPaymentEvents(events);
                setLoading(false);
               
              } catch (error) {
                console.error(error);
              }
            }
            else {
              console.error("MetaMask extension not detected");
          }
    };
    initializeWeb3();
}  ,[]);


    return (
        <div>
            {loading?<p>Loading</p>:
            <div>
             <h1>Payment Events</h1>
             <ul>
               {paymentEvents.map((event, index) => (
                 <li key={index}>
                   {/* Display event details */}
                   {JSON.stringify(event)}
                 </li>
               ))}
             </ul>
             </div>}
         
        </div>
      );
}
