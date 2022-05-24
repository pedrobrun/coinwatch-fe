import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BackIcon from '../components/BackIcon';
import ProtectedRoute from '../components/ProtectedRoute';
import JwtCookieProvider from '../providers/JwtCookieProvider';
import useJwtCookie from '../useContext/useJwtCookie';

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

  return (
    <JwtCookieProvider>
      <ProtectedRoute>
        <BackIcon></BackIcon>

        {myCoins &&
          myCoins.map((c: any) => {
            return (
              <ul key={c.id}>
                <li>{c.currency}</li>
                <li>{c.name}</li>
                <li>{c.price}</li>
                <li>{c.logo_url}</li>
                <li>{c.symbol}</li>
              </ul>
            );
          })}
      </ProtectedRoute>
    </JwtCookieProvider>
  );
}
