import { cookieName, githubApi, githubAccessTokenUri } from 'src/config';
import { parseCookie } from 'src/cookie';
import { GithubAccessTokenResponse, Handler } from 'src/types';

export const isAuthenticated: Handler = async (request) => {
  const cookie = parseCookie(request.headers.get('Cookie') || '');
  if (cookie[cookieName]) {
    const response = await fetch(`${githubApi}/user`, {
      headers: {
        Authorization: `token ${cookie[cookieName]}`,
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'User-Agent': 'bestyjs',
      },
    });
    if (response.ok) {
      return new Response('status: OK', {
        status: 200,
      });
    }
  }
  return new Response('Unauthorized', {
    status: 401,
  });
};
export const authenticate: Handler = async (request, ctx) => {
  const { code } = await request.json();
  const response = await fetch(
    `${githubAccessTokenUri}?client_id=${ctx.env.CLIENT_ID}&client_secret=${ctx.env.CLIENT_SECRET}&code=${code}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    },
  );

  const { access_token } = await response.json<GithubAccessTokenResponse>();
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
