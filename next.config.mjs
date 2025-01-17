import NextFederationPlugin from '@module-federation/nextjs-mf'

/** @type {import('next').NextConfig} */
const nextConfig = () => {
  const config = {
    // Learn more: https://nextjs.org/docs/api-reference/next.config.js/react-strict-mode
    reactStrictMode: true,
    output: 'standalone',
    webpack(config, { isServer }) {

      config.plugins.push(
        new NextFederationPlugin({
          name: 'my-koodo-sod-shell',
          filename: 'remoteEntry.js',
          remotes: {
            product_subscription_overview_mfe: `product_subscription_overview_mfe@${process.env.PSO_MFE_ENTRY_POINT}`
          }
        })
      )

      // Exclude .d.ts & .map files from being processed
      config.module.rules.push({
        test: /\.(d\.ts|map)$/,
        use: 'ignore-loader'
      })

      if (isServer) {
        //   config.optimization.usedExports = false

        // Pino requires this otherwise we run into this error:
        // Error: Cannot find module '****/.next/server/pages/lib/worker.js'
        // https://github.com/pinojs/pino/issues/1841
        config.externals.push({
          '@telus/core-logger': 'commonjs @telus/core-logger',
          pino: 'commonjs pino',
        })
      }

      return config
    }
  }

  return config
}

export default nextConfig
