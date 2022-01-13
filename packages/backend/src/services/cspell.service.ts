import { IGithubFileContent } from '../types';

const cspell = [
  '.cspell.json',
  'cspell.json ',
  '.cSpell.json',
  'cSpell.json',
  'cspell.config.js',
  'cspell.config.cjs',
  'cspell.config.json',
  'cspell.config.yaml',
  'cspell.config.yml',
  'cspell.yaml',
  'cspell.yml ',
];

export const isCspell = ({
  packageConfig,
  directoryContent,
}: {
  packageConfig: Record<string, any>;
  directoryContent: IGithubFileContent[];
}) => {
  const scripts = Object.values<string>(packageConfig.scripts);
  const devDependencies = Object.keys(packageConfig.devDependencies);
  if (!devDependencies.includes('cspell')) {
    if (packageConfig.cspell) {
      return true;
    }
    for (const script of scripts) {
      if (script.includes('cspell')) {
        return true;
      }
    }
    for (const { name } of directoryContent) {
      if (cspell.includes(name)) {
        return true;
      }
    }
  }
  return false;
};
