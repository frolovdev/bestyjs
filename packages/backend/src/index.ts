import { Router } from 'itty-router';
import { handleOptions } from './cors';
import { authenticate, isAuthenticated } from './handlers/auth.handler';
import { notFound } from './handlers/notFound.handler';
import { getRepos } from './handlers/repository.handler';
import { createLogger } from './lib/logger';

const router = Router();
router.post('/api/oauth/token', authenticate);
router.get('/api/me', isAuthenticated);
router.get('/api/repos', getRepos);
router.all('*', notFound);

export async function handleRequest(request: Request, env: Bindings, context: ExecutionContext) {
  const logger = createLogger(request, env, context);
  const ctx = { env, logger };

  if (request.method === 'OPTIONS') {
    return handleOptions(request, ctx);
  }

  const response = (await router.handle(request, ctx)) as Response;

  response.headers.set(
    'Access-Control-Allow-Origin',
    ctx.env.ENVIRONMENT === 'production' ? `https://${ctx.env.DOMAIN}` : '*',
  );
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Credentials', 'true');

  return response;
}

const worker: ExportedHandler<Bindings> = { fetch: handleRequest };

export default worker;
