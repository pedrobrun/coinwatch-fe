import { createContext } from 'react';

interface IContext {
  provider?: any;
  account?: any;
}

export const MetamaskContext = createContext<IContext | undefined>(undefined);
