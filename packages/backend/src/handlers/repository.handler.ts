import { extractCookie } from '../cookie';
import { isPrettier } from '../services/prettier.service';
import { IGithubAPIRepo, IRepoResponse } from '../types';
import { isEslint } from '../services/eslint.service';
import { isJest } from '../services/jest.service';
import { isTypescript } from '../services/typescript.service';
import { isCspell } from '../services/cspell.service';
import { isEditorConfig } from '../services/editorconfig.service';
import { handler } from '../lib/handler';
import { throwInternalServerError, throwUnauthorized } from '../lib/errors';
import {
  getGithubRepos,
  getPackageConfig,
  getGithubDirectoryContent,
  getGithubReposByUsername,
} from '../sdk/github.sdk';

const mapQuery = (url: string): Record<string, string> => {
  const mapQuery: Record<string, string> = {};
  if (!url.includes('?')) {
    return mapQuery;
  }
  const queryParams = url.split('?')[1].split('&');
  for (const param of queryParams) {
    const keyValue = param.split('=');
    mapQuery[keyValue[0]] = keyValue[1];
  }
  return mapQuery;
};

export const getRepos = handler(async (request, ctx) => {
  const queryParams = mapQuery(request.url);
  let githubRepositories: IGithubAPIRepo[];
  const accessToken = extractCookie(request.headers.get('Cookie') || '') || '';
  if (queryParams['username']) {
    console.log(queryParams['username']);
    try {
      githubRepositories = await getGithubReposByUsername(ctx, queryParams['username']);
    } catch (err: any) {
      ctx.logger.error(err, { message: 'getRepos' });
      throwInternalServerError();
    }
  } else {
    if (!accessToken) {
      throwUnauthorized();
    }
    try {
      githubRepositories = await getGithubRepos(ctx, accessToken);
    } catch (err: any) {
      ctx.logger.error(err, { message: 'getRepos' });
      throwInternalServerError();
    }
  }
  let responseBody: IRepoResponse[] = [];
  try {
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
          eslint: isEslint({ directoryContent, packageConfig }),
          jest: isJest({ directoryContent, packageConfig }),
          typescript: await isTypescript(packageConfig),
          cspell: isCspell({ packageConfig, directoryContent }),
          editorConfig: isEditorConfig(directoryContent),
        };
        responseBody = [...responseBody, repository];
      }
    }
  } catch (err: any) {
    ctx.logger.error(err, { message: 'getRepos' });
    throwInternalServerError();
  }

  return {
    body: responseBody,
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  };
});
