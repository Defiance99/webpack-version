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
          wysiwyg: 'wysiwyg@http://localhost:3002/remoteEntry.js',
          UI: 'UI@http://localhost:3001/remoteEntry.js',
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
