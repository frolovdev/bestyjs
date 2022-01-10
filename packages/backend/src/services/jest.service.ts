import { IGithubFileContent } from 'src/types';

const jest = ['jest.config.js', 'jest.config.ts'];

export const isJest = ({
  packageConfig,
  directoryContent,
}: {
  packageConfig: Record<string, any>;
  directoryContent: IGithubFileContent[];
}): boolean => {
  if (packageConfig.jest) {
    return true;
  }
  for (const entry of directoryContent) {
    if (jest.includes(entry.name)) {
      return true;
    }
  }
  return false;
};
