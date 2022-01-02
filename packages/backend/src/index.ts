import { parseCookie } from './cookie';
import { Router } from 'itty-router';
import { handleOptions } from './cors';

const githubAccessTokenUri = 'https://github.com/login/oauth/access_token';
const githubApi = 'https://api.github.com';
const cookieName = 'qid';

interface Ctx {
  env: { CLIENT_ID: string; CLIENT_SECRET: string };
}

type Handler = (request: Request, ctx: Ctx) => Promise<Response>;

interface GithubAccessTokenResponse {
  access_token: string;
  scopes: string;
  token_type: string;
}
const notFound: Handler = async (request) => {
  return new Response('bad request', {
    status: 404,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });
};

const isAuthenticated: Handler = async (request) => {
  const cookie = parseCookie(request!.headers.get('Cookie') || '');
  if (cookie[cookieName]) {
    const response = await fetch(`${githubApi}/user`, {
      headers: {
        Authorization: `token ${cookie[cookieName]}`,
      },
    });

    if (response.status === 200) {
      return new Response('status: OK', {
        status: 200,
      });
    }
  }
  return new Response('Unauthorized', {
    status: 401,
  });
};
const authenticate: Handler = async (request, ctx) => {
  const { code } = await request!.json();
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
      'Set-Cookie': `qid=${access_token};SameSite=Lax; HttpOnly; Path=/`,
    },
  });
};

const router = Router();
router.post('/api/oauth/token', authenticate);
router.get('/api/me', isAuthenticated);
router.all('*', notFound);

export async function handleRequest(request: Request, env: Bindings) {
  const ctx = { env };
  if (request.method === 'OPTIONS') {
    return handleOptions(request);
  }

  const response = (await router.handle(request, ctx)) as Response;

  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  return response;
}

const worker: ExportedHandler<Bindings> = { fetch: handleRequest };

export default worker;
