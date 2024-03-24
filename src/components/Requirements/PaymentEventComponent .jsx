import React,{useState,useEffect} from 'react';
import Web3 from 'web3';
import contractABI from '../../../contractAbi.json';
import '../../style.css';
export const PaymentEventComponent=(props)=>{
 
    const [recipients, setRecipient] = useState([]);
    const [loading, setLoading] = useState(true);
    const [contract, setContract] = useState(null);
    const [web3, setWeb3] = useState(null);
    const [currentAccount, setCurrentAccount] = useState('');
    const [amounts,setAmount]=useState([]);
    const [timeStamps,setTimeStamps]=useState([]);

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
                  const accounts = await initializedWeb3.eth.getAccounts();
                  setCurrentAccount(accounts[0]);
                console.log(accounts[0]);
                  contract.methods.getTotalPayments(props.userAddress)
            .call({ from: props.userAddress })
            .then(result=> {
             
              const amounts = result[0]; // Array of amounts
              const recipients = result[1]; // Array of recipients
              const timestamps=result[2];
              setAmount(amounts);
              setRecipient(recipients);
              setTimeStamps(result[2]);
              // Process the returned data
              for (let i = 0; i < amounts.length; i++) {
                const totalPaymentsEther = initializedWeb3.utils.fromWei(amounts[i], 'ether');
                  console.log(`Recipient: ${recipients[i]}, Amount: ${totalPaymentsEther},Time: ${timestamps[i]}`);
              }
            })
            .catch(error => {
                console.error('Error calling getTotalPayments:', error);
            });
                  
                
                  console.log(currentAccount);
             
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

console.log(amounts);
console.log(recipients);
console.log(timeStamps);
    return (
      <div className="table-container">
      {loading? <h1>Loading</h1>:
          <div>
            <h2 className="form-heading">
           
           PaymentInfo:
         </h2>
         
         
         <table >
                <thead>
                    <tr>
                        <th>Recipient</th>
                        <th>Amount</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {amounts.map((amount, index) => (
                        <tr key={index}>
                          <td>{recipients[index]}</td>
                            <td>{web3.utils.fromWei(amount, 'ether')}</td>
                            <td>{timeStamps[index]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
         
          </div>
          
    }
          
        </div>
      );
}
