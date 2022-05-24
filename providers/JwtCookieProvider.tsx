import { ethers } from 'ethers';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { JwtCookieContext } from '../contexts/JwtCookieContext';

export default function CookiesProvider({ children }: any) {
  const [jwtToken, setJwtToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    const jwt = Cookies.get('jwt');
    setJwtToken(jwt);
  }, [children]);

  return (
    <JwtCookieContext.Provider value={jwtToken}>
      {children}
    </JwtCookieContext.Provider>
  );
}
