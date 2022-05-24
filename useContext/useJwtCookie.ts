import { useContext } from 'react';
import { JwtCookieContext } from '../contexts/JwtCookieContext';

const useJwtCookie = () => useContext(JwtCookieContext);

export default useJwtCookie;
