export class HttpError extends Error {
  constructor(public status: number, message: string, public data?: any) {
    super(message);
    Error.captureStackTrace(this);
    this.name = 'HttpError';
  }
}

export function throwUnauthorized(): never {
  const message = 'Unauthorized';
  throw new HttpError(401, message);
}

export function throwInternalServerError(): never {
  throw new HttpError(500, 'Internal Server Error');
}
