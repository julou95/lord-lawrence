const withPWA = require("next-pwa")({
  dest: 'public',
  register: true,
  skipWaiting: true,
  buildExcludes: ["app-build-manifest.json"]
})

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: true,
})

module.exports = nextConfig
