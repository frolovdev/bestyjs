export interface Version {
  error?: string;
  installedVersion: string;
  latestVersion: string;
}
export interface IRepoResponse {
  owner: string;
  name: string;
  fullName: string;
  language: string;
  contentUrl: string;
  typescript: {
    isTypescript: boolean;
    version?: Version;
  };
  eslint: boolean;
  prettier: boolean;
  jest: boolean;
  cspell: boolean;
  editorConfig: boolean;
}
