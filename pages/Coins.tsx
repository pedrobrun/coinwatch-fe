import axios from 'axios';
import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';
import BackIcon from '../components/BackIcon';
import JwtCookieProvider from '../providers/JwtCookieProvider';
import styles from '../styles/Coins.module.scss';
import useJwtCookie from '../useContext/useJwtCookie';

function Coins({
  coins,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const user = useJwtCookie();

  const addCoinToFavourites = async (coin: any) => {
    const addedCoin = await axios.post(
      'http://localhost:3000/coin',
      {
        coin,
        username: user?.username,
      },
      {
        headers: {
          authorization: `Bearer ${user?.jwt}`,
        },
      }
    );

    if (addedCoin.data === 'Already favourite.') {
      toast('Coin already favourited! 🙂', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }

    if (addedCoin.status === 200) {
      toast.success('Coin successfully favourited!', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <JwtCookieProvider>
      <div className={styles.main}>
        <div className={styles.firstRow}>
          <BackIcon></BackIcon>

          <div
            className={styles.myCoinsButton}
            onClick={() => {
              router.push('MyCoins');
            }}
          >
            See Favourite Coins
          </div>
        </div>

        {coins ? (
          (coins as any).map((c: any) => {
            return (
              <ul className={styles.coinUl} key={c.id}>
                <li className={styles.coinContainer}>
                  <div>
                    <p>Symbol</p>
                    <p>{c.symbol}</p>
                  </div>

                  <div>
                    <p>Name</p>
                    <p>{c.name}</p>
                  </div>

                  <div>
                    <p>Price</p>
                    <p>{c.price}</p>
                  </div>

                  <img className={styles.coinLogo} src={c.logo_url}></img>

                  {user?.jwt && user.username ? (
                    <img
                      className={styles.addIcon}
                      src="add-icon.webp"
                      onClick={() => {
                        addCoinToFavourites(c);
                      }}
                    ></img>
                  ) : (
                    <div>Login to favourite coins</div>
                  )}
                </li>
              </ul>
            );
          })
        ) : (
          <div>No coins found</div>
        )}
      </div>
    </JwtCookieProvider>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3001/api/currencies`);
  const coins = await res.json();

  if (!res) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      coins: coins,
    }, // will be passed to the page component as props
  };
}

export default Coins;
