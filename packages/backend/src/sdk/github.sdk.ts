export const callGithub = async (path: string, fetchOptions: RequestInit): Promise<Response> => {
  const headers = {
    ...fetchOptions.headers,
    'User-Agent': 'bestyjs',
  };
  const response = await fetch(path, {
    ...fetchOptions,
    headers,
  });
  return response;
};
