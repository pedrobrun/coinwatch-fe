import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import {
  IJwtCookieContext,
  JwtCookieContext,
} from '../contexts/JwtCookieContext';

export default function CookiesProvider({ children }: any) {
  const [user, setUser] = useState<IJwtCookieContext | undefined>(undefined);

  useEffect(() => {
    const jwt = Cookies.get('jwt');
    const username = Cookies.get('username');

    if (jwt && username) {
      setUser({ jwt, username });
    }
  }, [children]);

  return (
    <JwtCookieContext.Provider value={user}>
      {children}
    </JwtCookieContext.Provider>
  );
}
