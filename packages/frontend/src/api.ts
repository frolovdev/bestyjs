export const fetchAccessToken = async (githubAccessCode: string) => {
  return await fetch(getDomain('/oauth/token'), {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify({ code: githubAccessCode }),
  });
};

export const meQuery = async () => {
  return await fetch(getDomain('/me'), {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
};

export const reposQuery = async (username?: string) => {
  const url = username ? `/repos?username=${username}` : `/repos`;
  return await fetch(getDomain(url), {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
};

function getDomain(apiRoute: string) {
  return process.env.NODE_ENV === 'production'
    ? `https://api.bestyjs.com/api${apiRoute}`
    : `/api${apiRoute}`;
}
