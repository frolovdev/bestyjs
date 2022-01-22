import { Ctx } from '../types';
import { HttpError } from './errors';

type HandlerFunction = (
  request: Request,
  ctx: Ctx,
) => Promise<ResponseInit & { body?: BodyInit | object | null }>;

export const handler = (handlerFunc: HandlerFunction) => {
  return async (request: Request, ctx: Ctx) => {
    try {
      const { body, ...rest } = await handlerFunc(request, ctx);

      return new Response(body ? JSON.stringify(body) : undefined, rest);
    } catch (error: any) {
      ctx.logger.error(error, { message: 'handler' });

      if (error instanceof HttpError) {
        return new Response(error.message, {
          status: error.status,
        });
      }

      return new Response('Something went wrong', {
        status: 500,
        statusText: 'Internal Server Error',
      });
    }
  };
};
