export async function handleRequest(request: Request, env: Bindings) {
  const json = JSON.stringify({}, null, 2);
  return new Response(json, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });
}

const worker: ExportedHandler<Bindings> = { fetch: handleRequest };

export default worker;
