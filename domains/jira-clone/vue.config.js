const path = require('path');
const { defineConfig } = require('@vue/cli-service');
const { ModuleFederationPlugin } = require('webpack').container;

const isProd = process.env.NODE_ENV === 'production';
const remoteWysiwyg = 'http://localhost:3002/remoteEntry.js';
const remoteUI = 'http://localhost:3001/remoteEntry.js';

module.exports = defineConfig({
  publicPath: '/',
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/assets/styles/index.scss";',
      },
    },
  },
  configureWebpack: {
    entry: path.resolve(__dirname, './src/index.ts'),
    optimization: {
      splitChunks: false,
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'jira-clone-host',
        filename: 'remoteEntry.js',
        remotes: {
          wysiwyg: `wysiwyg@${remoteWysiwyg}`,
          UI: `UI@${remoteUI}`,
        },
        // eslint-disable-next-line global-require
        shared: {
          vue: {
            eager: true,
            singleton: true,
          },
        },
      }),
    ],
  },
});
