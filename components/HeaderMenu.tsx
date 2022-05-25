import Link from 'next/link';
import React from 'react';
import useJwtCookie from '../useContext/useJwtCookie';
import styles from './HeaderMenu.module.scss';

export function HeaderMenu() {
  const user = useJwtCookie();

  return (
    <>
      {
        <ul className={styles.optionsMenu}>
          <li className={styles.li}>
            <Link href={'/'}>Home</Link>
          </li>
          <div className={styles.options}>
            {!user ? (
              <>
                <li className={styles.li}>
                  <Link href={'Register'}>Sign Up</Link>
                </li>
                <li className={styles.li}>
                  <Link href={'Login'}>Sign In</Link>
                </li>
              </>
            ) : (
              <div>
                Hello, <span className={styles.username}>{user.username}</span>
              </div>
            )}
          </div>
        </ul>
      }
      <hr className={styles.divider}></hr>
    </>
  );
}
