const path = require('path');
const { defineConfig } = require('@vue/cli-service');
const { ModuleFederationPlugin } = require('webpack').container;

const isProd = true;
const remoteWysiwyg = isProd ? 'https://vue-jira-wysiwyg.onrender.com/remoteEntry.js' : 'http://localhost:3002/remoteEntry.js';
const remoteUI = isProd ? 'https://vue-jira-ui.onrender.com/remoteEntry.js' : 'http://localhost:3001/remoteEntry.js';

module.exports = defineConfig({
  output: {
    publicPath: 'auto',
  },
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
