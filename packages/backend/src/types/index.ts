import Rollbar from 'rollbar';
import { TypescriptServiceResponse } from '../services/typescript.service';

export interface Logger {
  error: (
    e: Error,
    options?: {
      message?: string | undefined;
      data?: any;
    },
  ) => Rollbar.LogResult | undefined;
  debug: (message: string, data?: any) => Rollbar.LogResult | undefined;
}

export interface Ctx {
  env: Bindings;
  logger: Logger;
}

export interface IGithubAPIRepo {
  owner: string;
  name: string;
  full_name: string;
  language: string;
  contents_url: string;
}

export interface IRepoResponse {
  owner: string;
  name: string;
  fullName: string;
  language: string;
  contentUrl: string;
  prettier: boolean;
  eslint: boolean;
  jest: boolean;
  typescript: TypescriptServiceResponse;
  cspell: boolean;
  editorConfig: boolean;
}

export interface GithubAccessTokenResponse {
  access_token: string;
  scopes: string;
  token_type: string;
}

export interface IGithubFileContent {
  name: string;
  type: string;
  path: string;
  content?: string;
  encoding?: string;
}

export interface PackageConfig {
  scripts?: Record<string, string>;
  devDependencies?: Record<string, string>;
  dependencies?: Record<string, string>;
  jest?: Record<string, any>;
  prettier?: Record<string, any>;
  eslintConfig?: Record<string, any>;
  cspell?: Record<string, any>;
}
