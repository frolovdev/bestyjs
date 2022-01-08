import { cookieName } from './config';

export const parseCookie = (cookie: string): { [key: string]: string } => {
  const map: { [key: string]: string } = {};
  if (!cookie) {
    return map;
  }
  [...cookie.split(';')].forEach((cookie) => {
    const keyValuePair = cookie.split('=');
    map[keyValuePair[0].trim()] = keyValuePair[1].trim();
  });
  return map;
};

export const extractCookie = (cookieHeader: string) => {
  const cookie = parseCookie(cookieHeader);
  return cookie[cookieName] || null;
};
