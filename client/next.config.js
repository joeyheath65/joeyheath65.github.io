/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static HTML export
  basePath: '/joeyheath65.github.io',  // Match your repository name
  images: {
    unoptimized: true,  // Required for static export
  },
  // Disable server-side features when exporting
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig 