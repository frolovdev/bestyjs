import { handler } from 'src/lib/handler';
import { cookieName } from '../config';
import { parseCookie } from '../cookie';
import { getAccessToken, isValid } from '../services/auth.service';

export const isAuthenticated = handler(async (request) => {
  const cookie = parseCookie(request.headers.get('Cookie') || '');
  if (cookie[cookieName] && isValid(cookie[cookieName])) {
    return {
      status: 200,
    };
  }
  return {
    status: 401,
  };
});
export const authenticate = handler(async (request, ctx) => {
  const { code } = await request.json();
  const { access_token } = await getAccessToken({ code, ctx });
  if (!access_token) {
    return {
      status: 401,
    };
  }
  return {
    status: 200,
    headers: {
      'Set-Cookie': `qid=${access_token}; SameSite=Lax; HttpOnly; Path=/${
        ctx.env.ENVIRONMENT === 'production' ? `; Secure; Domain=${ctx.env.DOMAIN};` : ''
      }`,
    },
  };
});
