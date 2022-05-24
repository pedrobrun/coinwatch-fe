import { createContext } from 'react';

export type IJwtCookieContext = {
  jwt: string;
  username: string;
};

export const JwtCookieContext = createContext<IJwtCookieContext | undefined>(
  undefined
);
