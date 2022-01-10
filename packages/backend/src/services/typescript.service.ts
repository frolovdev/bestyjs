export const isTypescript = (packageConfig: Record<string, any>): boolean => {
  const devDependencies = packageConfig.devDependencies as { [key: string]: string };
  const dependencies = packageConfig.dependencencies as { [key: string]: string };
  for (const dependency of Object.keys({ ...devDependencies, ...dependencies })) {
    if (dependency === 'typescript') {
      return true;
    }
  }
  return false;
};
