import { githubApi } from '../config';
import { Ctx, IGithubAPIRepo, IGithubFileContent } from '../types';

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

export const getGithubRepos = async (ctx: Ctx, accessToken: string): Promise<IGithubAPIRepo[]> => {
  try {
    const response = await callGithub(
      `${githubApi}/user/repos?accept=application/vnd.github.v3+json&sort=updated`,
      {
        headers: {
          Authorization: `token ${accessToken}`,
        },
      },
    );
    return await response.json<IGithubAPIRepo[]>();
  } catch (error: any) {
    ctx.logger.error(error, { message: 'getGithubRepos' });
    return [];
  }
};

export const getPackageConfig = async ({
  contentUri,
  accessToken,
}: {
  contentUri: string;
  accessToken: string;
}): Promise<Record<string, any> | null> => {
  const contentResponse = await callGithub(`${contentUri}/package.json`, {
    headers: {
      Authorization: `token ${accessToken}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });
  if (contentResponse.status !== 200) {
    return null;
  }
  const contentResult = await contentResponse.json<IGithubFileContent>();
  const buffer = atob(contentResult.content!);
  let packageConfig: Record<string, any>;
  try {
    packageConfig = JSON.parse(buffer);
  } catch (err) {
    return null;
  }
  return packageConfig;
};

export const getGithubDirectoryContent = async ({
  contentUri,
  accessToken,
}: {
  contentUri: string;
  accessToken: string;
}): Promise<IGithubFileContent[]> => {
  const directoryContentResponse = await callGithub(`${contentUri}/`, {
    headers: {
      Authorization: `token ${accessToken}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });
  return await directoryContentResponse.json<IGithubFileContent[]>();
};
