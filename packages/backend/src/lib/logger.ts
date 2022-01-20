import Rollbar from 'rollbar';
import { Logger } from '../types';

type Data = any;

export const error =
  (env: Bindings, rollbar: Rollbar) =>
  (e: Error, options: { message?: string; data?: Data } = {}) => {
    if (env.ENVIRONMENT === 'development') {
      console.error(e, options);
      return;
    }

    return rollbar.error(e, options);
  };

export const debug = (env: Bindings, rollbar: Rollbar) => (message: string, data?: Data) => {
  if (env.ENVIRONMENT === 'development') {
    console.log(message, data);
    return;
  }

  return rollbar.debug(message, data);
};

export function createLogger(env: Bindings): Logger {
  const rollbar = new Rollbar({ accessToken: env.ROLLBAR_TOKEN });
  return { error: error(env, rollbar), debug: debug(env, rollbar) };
}
