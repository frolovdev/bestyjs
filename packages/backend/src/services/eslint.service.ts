import { IGithubFileContent } from '../types';

const eslint = [
  '.eslintrc.js',
  '.eslintrc.cjs',
  '.eslintrc.yaml',
  '.eslintrc.yml',
  '.eslintrc.json',
];

export const isEslint = ({
  packageConfig,
  directoryContent,
}: {
  packageConfig: Record<string, any>;
  directoryContent: IGithubFileContent[];
}): boolean => {
  if (packageConfig.eslintConfig) {
    return true;
  }
  for (const entry of directoryContent) {
    if (eslint.includes(entry.name)) {
      return true;
    }
  }
  return false;
};
