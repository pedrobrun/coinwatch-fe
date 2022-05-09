import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import styles from '../styles/Coins.module.scss';

function Coins({
  coins,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
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
  const res = await fetch(`http://localhost:3000/api/currencies`);
  const coins = await res.json();
  console.log(coins);

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
