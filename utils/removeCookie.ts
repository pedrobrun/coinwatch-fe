import Cookies from 'js-cookie';

export default function removeCookie(cookieName: string) {
  return Cookies.remove(cookieName);
}
