import { useContext } from 'react';
import { MetamaskContext } from '../contexts/MetaMaskContext';

const useMetaMask = () => useContext(MetamaskContext);

export default useMetaMask;
