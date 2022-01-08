import { githubApi } from '../config';
import { IGithubAPIRepo, IGithubFileContent } from '../types';

export const getGithubRepos = async (accessToken: string): Promise<IGithubAPIRepo[]> => {
  const response = await fetch(
    `${githubApi}/user/repos?accept=application/vnd.github.v3+json&sort=updated`,
    {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    },
  );
  return await response.json<IGithubAPIRepo[]>();
};

export const getPackageConfig = async ({
  contentUri,
  accessToken,
}: {
  contentUri: string;
  accessToken: string;
}): Promise<Record<string, any> | null> => {
  const contentResponse = await fetch(`${contentUri}/package.json`, {
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
  const directoryContentResponse = await fetch(`${contentUri}/`, {
    headers: {
      Authorization: `token ${accessToken}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });
  return await directoryContentResponse.json<IGithubFileContent[]>();
};
