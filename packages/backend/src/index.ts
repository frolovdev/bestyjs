import { parseCookie } from '@/cookie';
import { HandlerContext, Router } from '@/router';

const githubAccessTokenUri = 'https://github.com/login/oauth/access_token';
const githubApi = 'https://api.github.com';
const cookieName = 'qid';

interface GithubAccessTokenResponse {
  access_token: string;
  scopes: string;
  token_type: string;
}
const notFound = async ({}: HandlerContext): Promise<Response> => {
  return new Response('bad request', {
    status: 404,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });
};

const isAuthenticated = async ({ request }: HandlerContext): Promise<Response> => {
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
const authenticate = async ({ ctx, request }: HandlerContext): Promise<Response> => {
  const { code } = await request!.json();
  const response = await fetch(
    `${githubAccessTokenUri}?client_id=${ctx.CLIENT_ID}&client_secret=${ctx.CLIENT_SECRET}&code=${code}`,
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

const router = new Router();
router.post('/api/oauth/token', authenticate);
router.get('/api/me', isAuthenticated);
router.all('*', notFound);

export async function handleRequest(request: Request, env: Bindings) {
  router.ctx = env;
  const result = router.handleRequest(request);
  if (result?.handlerPromise) {
    return await result.handlerPromise;
  }
}

const worker: ExportedHandler<Bindings> = { fetch: handleRequest };

export default worker;
