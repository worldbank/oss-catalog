/** Next.js config for static export and GitHub Pages */
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: '',
  },
};