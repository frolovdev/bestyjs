import { cookieName } from '../config';
import { parseCookie } from '../cookie';
import { getAccessToken, isValid } from '../services/auth.service';
import { Handler } from '../types';

export const isAuthenticated: Handler = async (request) => {
  const cookie = parseCookie(request.headers.get('Cookie') || '');
  if (cookie[cookieName] && isValid(cookie[cookieName])) {
    return new Response('status: OK', {
      status: 200,
    });
  }
  return new Response('Unauthorized', {
    status: 401,
  });
};
export const authenticate: Handler = async (request, ctx) => {
  const { code } = await request.json();
  const { access_token } = await getAccessToken({ code, ctx });
  if (!access_token) {
    return new Response('ERROR', {
      status: 401,
    });
  }
  return new Response('status: OK', {
    status: 200,
    headers: {
      'Set-Cookie': `qid=${access_token}; SameSite=Lax; HttpOnly; Path=/${
        ctx.env.ENVIRONMENT === 'production' ? `; Secure; Domain=${ctx.env.DOMAIN};` : ''
      }`,
    },
  });
};
