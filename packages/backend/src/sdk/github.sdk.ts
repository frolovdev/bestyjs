export const callGithub = async (path: string, fetchOptions: RequestInit): Promise<Response> => {
  const response = await fetch(`${path}`, {
    ...fetchOptions,
    headers: {
      'User-Agent': 'bestyjs',
    },
  });
  return response;
};
