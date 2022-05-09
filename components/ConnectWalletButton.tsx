import React from 'react';
import style from './ConnectWalletButton.module.scss';

export default function ConnectButton() {
  return (
    <div
      className={style.capsule}
      onClick={() => {
        window.location.reload();
      }}
    >
      Connect Wallet
    </div>
  );
}
