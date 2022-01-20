import {
  getGithubDirectoryContent,
  getGithubRepos,
  getPackageConfig,
} from '../services/github.service';
import { extractCookie } from '../cookie';
import { isPrettier } from '../services/prettier.service';
import { IRepoResponse } from '../types';
import { isEslint } from '../services/eslint.service';
import { isJest } from '../services/jest.service';
import { isTypescript } from '../services/typescript.service';
import { isCspell } from '../services/cspell.service';
import { isEditorConfig } from '../services/editorconfig.service';
import { handler } from '../lib/handler';

export const getRepos = handler(async (request) => {
  const accessToken = extractCookie(request.headers.get('Cookie') || '');
  if (!accessToken) {
    return {
      status: 401,
    };
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
          eslint: isEslint({ directoryContent, packageConfig }),
          jest: isJest({ directoryContent, packageConfig }),
          typescript: await isTypescript(packageConfig),
          cspell: isCspell({ packageConfig, directoryContent }),
          editorConfig: isEditorConfig(directoryContent),
        };
        responseBody = [...responseBody, repository];
      }
    }
  } catch (err) {
    console.log(err);
    return {
      status: 500,
    };
  }

  return {
    body: responseBody,
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  };
});
