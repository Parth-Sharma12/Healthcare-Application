// cookieHelper.js
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const getAnonymousUserId = () => {
  return cookies.get('anonymousUserId');
};

export const setAnonymousUserId = (userId) => {
  cookies.set('anonymousUserId', userId, { path: '/' });
};

export const removeAnonymousUserId = () => {
  cookies.remove('anonymousUserId', { path: '/' });
};
