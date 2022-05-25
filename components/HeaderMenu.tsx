import Link from 'next/link';
import React from 'react';
import useJwtCookie from '../useContext/useJwtCookie';
import styles from './HeaderMenu.module.scss';

export function HeaderMenu() {
  return (
    <>
      {
        <ul className={styles.optionsMenu}>
          <li className={styles.li}>
            <Link href={'/'}>Home</Link>
          </li>
          <div className={styles.options}>
            <li className={styles.li}>
              <Link href={'Register'}>Sign Up</Link>
            </li>
            <li className={styles.li}>
              <Link href={'Login'}>Sign In</Link>
            </li>
          </div>
        </ul>
      }
      <hr className={styles.divider}></hr>
    </>
  );
}
