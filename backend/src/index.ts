export async function handleRequest(request: Request, env: Bindings) {
  // Match route against pattern /:name/*action
  const url = new URL(request.url);
  const match = /\/(?<name>[^/]+)(?<action>.*)/.exec(url.pathname);
  if (!match?.groups) {
    // If we didn't specify a name, default to "test"
    return Response.redirect(`${url.origin}/test/increment`, 302);
  }

  // Forward the request to the named Durable Object...
  // const { COUNTER } = env;
  // const id = COUNTER.idFromName(match.groups.name);
  // const stub = COUNTER.get(id);
  // // ...removing the name prefix from URL
  // url.pathname = match.groups.action;

  const json = JSON.stringify({}, null, 2);
  return new Response(json, {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
}

const worker: ExportedHandler<Bindings> = { fetch: handleRequest };

export default worker;
