import { PackageConfig } from '../types';

interface Version {
  error: string;
  installedVersion: string;
  latestVersion: string;
}
export interface TypescriptServiceResponse {
  isTypescript: boolean;
  version?: Version;
}

export const isTypescript = async (
  packageConfig: PackageConfig,
): Promise<TypescriptServiceResponse> => {
  const devDependencies = packageConfig.devDependencies;
  const dependencies = packageConfig.dependencies;
  for (const [dependency, version] of Object.entries({ ...devDependencies, ...dependencies })) {
    if (dependency === 'typescript') {
      let versionObject: Version
      try {
        const response = await fetch('https://registry.npmjs.org/typescript/latest', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const { version: latestVersion } = await response.json();
        versionObject = {
          error: "",
          installedVersion: version,
          latestVersion,
        }
      } catch (err) {
        console.log(err)
        versionObject = {
          error: "unavailable",
          installedVersion: version,
          latestVersion:"",
        }
      }

      return {
        isTypescript: true,
        version: versionObject,
      };
    }
  }
  return {
    isTypescript: false,
  };
};
