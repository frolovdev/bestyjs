import fetch from 'unfetch';

export default async function getUserCount() {
  const data = await (await fetch('https://stats.borodutch.com/count')).json();
  return data.count;
}
export const fetchAccessToken = async (githubAccessCode: string) => {
  return await fetch('/api/oauth/token', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ code: githubAccessCode }),
  });
};
export const meQuery = async () => {
  return await fetch('/api/me', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
