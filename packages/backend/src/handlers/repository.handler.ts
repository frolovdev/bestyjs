import {
  getGithubDirectoryContent,
  getGithubRepos,
  getPackageConfig,
} from '../services/github.service';
import { extractCookie } from '../cookie';
import { isPrettier } from '../services/prettier.service';
import { Handler, IRepoResponse } from '../types';

export const getRepos: Handler = async (request) => {
  const accessToken = extractCookie(request.headers.get('Cookie') || '');
  if (!accessToken) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }
  let responseBody: IRepoResponse[] = [];
  try {
    const githubRepositories = await getGithubRepos(accessToken);
    for (const repo of githubRepositories) {
      if (
        repo.language &&
        (repo.language.toLowerCase() === 'typescript' ||
          repo.language.toLowerCase() === 'javascript')
      ) {
        const contentUri = repo.contents_url.slice(0, repo.contents_url.lastIndexOf('/'));
        const packageConfig = await getPackageConfig({ contentUri, accessToken });
        if (!packageConfig) {
          continue;
        }
        const directoryContent = await getGithubDirectoryContent({ contentUri, accessToken });
        const repository: IRepoResponse = {
          owner: repo.owner,
          name: repo.name,
          fullName: repo.full_name,
          contentUrl: repo.contents_url,
          language: repo.language,
          prettier: isPrettier({ directoryContent, packageConfig }),
          eslint: false,
          jest: false,
        };
        responseBody = [...responseBody, repository];
      }
    }
  } catch (err) {
    console.error(err);
    return new Response('Error', {
      status: 500,
    });
  }

  return new Response(JSON.stringify(responseBody), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
