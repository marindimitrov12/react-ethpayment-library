import Web3 from 'web3';
import contractABI from '../../../contractAbi.json';

export async function initializeWeb3(ethereumProvider, contractAddress) {
    if (ethereumProvider) {
        try{
            await ethereumProvider.request({ method: 'eth_requestAccounts' });
            const web3 = new Web3(ethereumProvider);
            const contract = new web3.eth.Contract(contractABI.abi, contractAddress);
            return { web3, contract }; 
        }
        catch(error){
          console.error(error);
        }
      
    } else {
      console.warn('MetaMask not detected');
      return null;
    }
  }