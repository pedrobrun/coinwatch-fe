import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { MetamaskContext } from '../contexts/MetaMaskContext';

export default function MetaMaskProvider({ children }: any) {
  const [value, setValue] = useState<any>();

  const connect = async () => {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum,
      'any' // this allows network to change
    );

    if (!provider) {
      alert('You have to install MetaMask extension');
    }

    const account = (await provider.send('eth_requestAccounts', []))[0];
    return { provider, account };
  };

  useEffect(() => {
    const conn = async () => {
      const provider = await connect();
      setValue({ provider, connect });
    };

    (window as any).ethereum.on('accountsChanged', function (accounts: any) {
      conn();
    });

    (window as any).ethereum.on('chainChanged', function (networkId: any) {
      location.reload();
    });
  });

  useEffect(() => {
    const provider = connect();
    setValue(provider);
  }, []);

  return (
    <MetamaskContext.Provider value={value}>
      {children}
    </MetamaskContext.Provider>
  );
}
