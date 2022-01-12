import { IGithubFileContent } from '../types';

const cspell = [
  '.cspell.json ',
  'cspell.json  ',
  '.cSpell.json ',
  'cSpell.json  ',
  'cspell.config.js',
  'cspell.config.cjs',
  'cspell.config.json',
  'cspell.config.yaml',
  'cspell.config.yml',
  'cspell.yaml  ',
  'cspell.yml   ',
  'package.json ',
];

const isCspell = ({
  packageConfig,
  directoryContent,
}: {
  packageConfig: Record<string, any>;
  directoryContent: IGithubFileContent[];
}) => {
  if (packageConfig.cspell) {
    return true;
  }
  for (const { name } of directoryContent) {
    if (cspell.includes(name)) {
      return true;
    }
  }
  return false;
};
