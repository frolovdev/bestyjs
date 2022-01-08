import { IGithubFileContent } from '../types/index';

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
  packageConfig: Record<string, any>;
  directoryContent: IGithubFileContent[];
}): boolean => {
  if (packageConfig.prettier) {
    return true;
  }
  for (const entry of directoryContent) {
    if (prettier.includes(entry.name)) {
      return true;
    }
  }
  return false;
};
