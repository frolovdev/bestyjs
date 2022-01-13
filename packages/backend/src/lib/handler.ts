import { Ctx } from '../types';

type HandlerFunction = (
  request: Request,
  ctx: Ctx,
) => Promise<ResponseInit & { body?: BodyInit | object | null }>;

export const handler = (handlerFunc: HandlerFunction) => {
  return async (request: Request, ctx: Ctx) => {
    const { body, ...rest } = await handlerFunc(request, ctx);

    return new Response(body ? JSON.stringify(body) : undefined, rest);
  };
};
