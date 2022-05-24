import axios from 'axios';
import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';
import styles from '../styles/Coins.module.scss';

function Coins({
  coins,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const addCoinToFavourites = async (coin: any) => {
    const addedCoin = await axios.post(
      'http://localhost:3000/coin',
      {
        coin,
        username: 'First_username',
      },
      {
        headers: {
          authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkZpcnN0X3VzZXJuYW1lIiwiZW5jb2RlZFBhc3N3b3JkIjoiJDJiJDEyJGlTajhkbWZLb2ZSWWQxY05UUUx6cnVRNmMuWnR2MGwwNDB5Rk5sNjdNMWFzYUVuMFJRVU1HIiwiaWF0IjoxNjUzMzQyMTY2LCJleHAiOjE2NTMzNDM5NjZ9.7ms3TMgjhRIQ5lJyLWzYpLfoPpSYwFi4lLQaWOpIZXk',
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
    <>
      <div className={styles.main}>
        <img
          className={styles.backIcon}
          src="back.png"
          alt=""
          onClick={handleBack}
        ></img>

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

                  <img
                    className={styles.addIcon}
                    src="add-icon.webp"
                    onClick={() => {
                      addCoinToFavourites(c);
                    }}
                  ></img>
                </li>
              </ul>
            );
          })
        ) : (
          <div>No coins found</div>
        )}
      </div>
    </>
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
