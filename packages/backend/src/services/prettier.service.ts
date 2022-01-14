import { IGithubFileContent, PackageConfig } from '../types/index';

const prettier = [
  '.prettierrc',
  '.prettierrc.json',
  '.prettierrc.yml',
  '.prettierrc.json5',
  '.prettierrc.js',
  '.prettierrc.cjs',
  'prettier.config.js',
  'prettier.config.cjs',
  '.prettierrc.toml',
];

export const isPrettier = ({
  packageConfig,
  directoryContent,
}: {
  packageConfig: PackageConfig;
  directoryContent: IGithubFileContent[];
}): boolean => {
  if (packageConfig.prettier) {
    return true;
  }
  for (const { name } of directoryContent) {
    if (prettier.includes(name)) {
      return true;
    }
  }
  return false;
};
