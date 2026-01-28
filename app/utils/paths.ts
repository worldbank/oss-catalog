// Helper to get the correct base path for assets in GitHub Pages
// This uses the basePath from next.config.ts
const basePath = process.env.NODE_ENV === 'production' ? '/oss-catalog' : '';

export function getAssetPath(path: string): string {
  return `${basePath}${path}`;
}
