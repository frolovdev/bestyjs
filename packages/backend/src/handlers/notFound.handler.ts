import { handler } from '../lib/handler';

export const notFound = handler(async () => {
  return new Response('bad request', {
    status: 404,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });
});
