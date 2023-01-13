const path = require('path');
const { defineConfig } = require('@vue/cli-service');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = defineConfig({
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/assets/styles/index.scss";',
      },
    },
  },
  transpileDependencies: true,
  publicPath: 'http://localhost:3001/',
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
    entry: path.resolve(__dirname, './src/index.ts'),
    plugins: [
      new ModuleFederationPlugin({
        name: 'UI',
        filename: 'remoteEntry.js',
        exposes: {
          './components': './src/components',
          './directives/ripple': './src/directives/ripple',
          './directives/clickOutside': './src/directives/clickOutside',
          './utils/useTheme': './src/composables/utils/useTheme',
          './utils/useThrottle': './src/composables/utils/useThrottle',
          './utils/useDebounce': './src/composables/utils/useDebounce',
        },
        shared: {
          vue: {
            eager: true,
            singleton: true,
          },
        },
      }),
    ],
    devServer: {
      port: 3001,
    },
  },
});
