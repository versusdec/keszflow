const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  webpack: (config) => {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: require.resolve('pdfjs-dist/build/pdf.worker.min.js'),
            to: path.join(__dirname, 'public'),
            force: true,
          },
        ],
      })
    )

    return config
  },
}

const withPlugins = require('next-compose-plugins')

const withTM = require('next-transpile-modules')(['@keszflow/components'])

const plugins = [
  [
    withTM,
    {
      webpack5: true,
    },
  ],
]

module.exports = withPlugins(plugins, nextConfig)
