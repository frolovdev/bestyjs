export interface Ctx {
  env: Bindings;
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
  typescript: boolean;
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
