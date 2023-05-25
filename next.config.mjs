// next.config.mjs
import withMDX from '@next/mdx';
import remarkImages from 'remark-images';

const options = {
  remarkPlugins: [remarkImages],
  rehypePlugins: [],
  extension: /\.mdx?$/
};

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default withMDX(options)(nextConfig);
