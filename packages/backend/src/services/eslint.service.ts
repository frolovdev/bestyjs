import { IGithubFileContent, PackageConfig } from '../types';

const eslint = [
  '.eslintrc.js',
  '.eslintrc.cjs',
  '.eslintrc.yaml',
  '.eslintrc.yml',
  '.eslintrc.json',
  '.eslintrc',
];

export const isEslint = ({
  packageConfig,
  directoryContent,
}: {
  packageConfig: PackageConfig;
  directoryContent: IGithubFileContent[];
}): boolean => {
  if (packageConfig.eslintConfig) {
    return true;
  }
  for (const { name } of directoryContent) {
    if (eslint.includes(name)) {
      return true;
    }
  }
  return false;
};
