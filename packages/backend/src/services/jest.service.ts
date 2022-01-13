import { IGithubFileContent } from '../types';

const jest = ['jest.config.js', 'jest.config.ts'];

export const isJest = ({
  packageConfig,
  directoryContent,
}: {
  packageConfig: Record<string, any>;
  directoryContent: IGithubFileContent[];
}): boolean => {
  const scripts = Object.values<string>(packageConfig.scripts);
  const devDependencies = Object.keys(packageConfig.devDependencies);
  if (devDependencies.includes('jest')) {
    if (packageConfig.jest) {
      return true;
    }
    for (const script of scripts) {
      if (script.includes('jest')) {
        return true;
      }
    }
    for (const { name } of directoryContent) {
      if (jest.includes(name)) {
        return true;
      }
    }
  }
  return false;
};
