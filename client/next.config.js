/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static HTML export
  basePath: '/joeyheath65.github.io',  // Match your repository name
  images: {
    unoptimized: true,  // Required for static export
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig 