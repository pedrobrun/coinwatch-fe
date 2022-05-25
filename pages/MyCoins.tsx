import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BackIcon from '../components/BackIcon';
import ProtectedRoute from '../components/ProtectedRoute';
import JwtCookieProvider from '../providers/JwtCookieProvider';
import useJwtCookie from '../useContext/useJwtCookie';
import styles from '../styles/MyCoins.module.scss';
import { HeaderMenu } from '../components/HeaderMenu';

export default function MyCoins() {
  const [myCoins, setMyCoins] = useState<any>();

  const user = useJwtCookie();

  const getMyCoins = async () => {
    if (!user?.jwt) return;
    const res = await axios.get('http://localhost:3000/coin/myCoins', {
      headers: {
        authorization: `Bearer ${user?.jwt}`,
      },
    });
    setMyCoins(res.data.myCoins);
  };

  useEffect(() => {
    getMyCoins();
  });

  const [clicked, setClicked] = useState(0);

  const handleToggle = (index: number) => {
    if (clicked === index) {
      return setClicked(-1);
    }
    return setClicked(index);
  };

  return (
    <JwtCookieProvider>
      <HeaderMenu></HeaderMenu>
      <ProtectedRoute>
        <div className={styles.wrapper}>
          <BackIcon></BackIcon>

          {myCoins &&
            myCoins.map((c: any, index: number) => (
              <div key={c.id} className={styles.coinContainer}>
                <ul className={styles.coinCard}>
                  <li>{c.currency}</li>
                  <li>{c.name}</li>
                  <li>${c.price}</li>
                  <img src={c.logo_url} className={styles.logo}></img>
                </ul>
                {clicked === index && (
                  <>
                    <div className={styles.moreDetails}>
                      <div>Status: {c.status}</div>
                      <div className={styles.rightColumnItem}>
                        Rank: {c.rank}
                      </div>
                      <div>
                        Variation from yesterday:{' '}
                        <span
                          className={
                            c.ytd.price_change_pct > 0
                              ? styles.positive
                              : styles.negative
                          }
                        >
                          {c.ytd.price_change_pct}
                        </span>
                      </div>
                      <div className={styles.rightColumnItem}>
                        Variation from 1 week:{' '}
                        <span
                          className={
                            c['7d'].price_change_pct > 0
                              ? styles.positive
                              : styles.negative
                          }
                        >
                          {c['7d'].price_change_pct}
                        </span>
                      </div>
                      <div>
                        Variation from 1 month:{' '}
                        <span
                          className={
                            c['30d'].price_change_pct > 0
                              ? styles.positive
                              : styles.negative
                          }
                        >
                          {c['30d'].price_change_pct}
                        </span>
                      </div>
                      <div className={styles.rightColumnItem}>
                        Variation from 1 year:{' '}
                        <span
                          className={
                            c['365d'].price_change_pct > 0
                              ? styles.positive
                              : styles.negative
                          }
                        >
                          {c['365d'].price_change_pct}
                        </span>
                      </div>
                    </div>
                  </>
                )}
                <div
                  className={styles.moreBttn}
                  onClick={() => {
                    handleToggle(index);
                  }}
                >
                  {clicked == index ? 'Hide' : 'Details'}
                </div>
              </div>
            ))}
        </div>
      </ProtectedRoute>
    </JwtCookieProvider>
  );
}
