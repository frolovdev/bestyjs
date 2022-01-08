import { Handler } from 'src/types';

export const notFound: Handler = async () => {
  return new Response('bad request', {
    status: 404,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });
};
