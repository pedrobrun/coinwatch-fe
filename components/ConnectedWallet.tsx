import React, { useEffect, useState } from 'react';
import style from './ConnectedWallet.module.scss';

interface Props {
  address?: string;
}

function ConnectedWallet({ address }: Props): JSX.Element {
  const [walletAddress, setWalletAddress] = useState<string | null>();

  useEffect(() => {
    setWalletAddress(address);
  }, [address]);

  let str;

  if (address) {
    const handledAddrStart = address.substring(0, 7);
    const handledAddrEnd = address.substring(
      address.length - 4,
      address.length
    );
    str = `${handledAddrStart}...${handledAddrEnd}`;
  }

  return (
    <div className={style.capsule}>
      <img className={style.icon} src="wallet-icon.png"></img>
      <p>{address ? str : 'Fetching'}</p>
    </div>
  );
}

export default ConnectedWallet;
