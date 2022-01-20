import { handler } from '../lib/handler';

export const test = handler(async () => {
  throw new Error('something bad happened');
});
