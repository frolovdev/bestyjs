import { PackageConfig } from 'src/types';

export const isTypescript = (packageConfig: PackageConfig): boolean => {
  const devDependencies = packageConfig.devDependencies;
  const dependencies = packageConfig.dependencies;
  for (const dependency of Object.keys({ ...devDependencies, ...dependencies })) {
    if (dependency === 'typescript') {
      return true;
    }
  }
  return false;
};
