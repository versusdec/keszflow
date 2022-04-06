/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
}

const withPlugins = require('next-compose-plugins')

const withTM = require('next-transpile-modules')([
  '@keszflow-business/components',
])

const plugins = [
  withTM({
    webpack5: true,
  }),
]

module.exports = withPlugins(plugins, nextConfig)
