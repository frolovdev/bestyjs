import Toucan from 'toucan-js';
import { Logger } from '../types';

type Data = any;

export const error =
  (env: Bindings, sentry: Toucan) =>
  (e: Error, options: { message?: string; data?: Data } = {}) => {
    if (env.ENVIRONMENT === 'development') {
      console.error(e, options);
      return;
    }

    sentry.withScope((scope) => {
      scope.setExtra('meta', options);
      sentry.captureException(e);
    });
  };

export const debug = (env: Bindings, sentry: Toucan) => (message: string, data?: Data) => {
  if (env.ENVIRONMENT === 'development') {
    console.log(message, data);
    return;
  }

  sentry.withScope((scope) => {
    scope.setExtra('meta', data);
    sentry.captureMessage(message);
  });
};

export function createLogger(request: Request, env: Bindings, context: ExecutionContext): Logger {
  const sentry = new Toucan({
    dsn: env.SENTRY_DSN,
    environment: env.ENVIRONMENT,
    context,
    request,
    allowedHeaders: ['user-agent'],
    allowedSearchParams: /(.*)/,
    release: env.SENTRY_RELEASE,
  });
  return { error: error(env, sentry), debug: debug(env, sentry) };
}
