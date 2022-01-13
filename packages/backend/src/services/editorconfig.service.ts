import { IGithubFileContent } from '../types';

const editorConfig = '.editorconfig';

export const isEditorConfig = (directoryContent: IGithubFileContent[]): boolean => {
  for (const { name } of directoryContent) {
    if (name === editorConfig) {
      return true;
    }
  }
  return false;
};
