import { callGithub } from '../sdk/github.sdk';
import { githubAccessTokenUri, githubApi } from '../config';
import { GithubAccessTokenResponse, Ctx } from '../types';

export const getAccessToken = async ({
  code,
  ctx,
}: {
  code: string;
  ctx: Ctx;
}): Promise<GithubAccessTokenResponse> => {
  const response = await fetch(
    `${githubAccessTokenUri}?client_id=${ctx.env.CLIENT_ID}&client_secret=${ctx.env.CLIENT_SECRET}&code=${code}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    },
  );
  return await response.json<GithubAccessTokenResponse>();
};

export const isValid = async (accessToken: string): Promise<boolean> => {
  const response = await callGithub(`${githubApi}/user`, {
    headers: {
      Authorization: `token ${accessToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
  return response.ok;
};
