import { PackageConfig } from '../types';

export interface TypescriptServiceResponse {
  isTypescript: boolean;
  isLatest: boolean;
}

export const isTypescript = async (
  packageConfig: PackageConfig,
): Promise<TypescriptServiceResponse> => {
  const devDependencies = packageConfig.devDependencies;
  const dependencies = packageConfig.dependencies;
  for (const [dependency, version] of Object.entries({ ...devDependencies, ...dependencies })) {
    if (dependency === 'typescript') {
      const response = await fetch('https://registry.npmjs.org/typescript/latest', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { version: latestVersion } = await response.json();
      return {
        isTypescript: true,
        isLatest: version.endsWith(latestVersion),
      };
    }
  }
  return {
    isTypescript: false,
    isLatest: false,
  };
};
