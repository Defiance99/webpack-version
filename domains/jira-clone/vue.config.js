const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { defineConfig } = require('@vue/cli-service');
const { ModuleFederationPlugin } = require('webpack').container;

const isProd = process.env === 'production';
const remoteWysiwyg = isProd ? 'https://vue-jira-wysiwyg.onrender.com' : 'http://localhost:3002/remoteEntry.js';
const remoteUI = isProd ? 'https://vue-jira-ui.onrender.com' : 'http://localhost:3001/remoteEntry.js';

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
      new HtmlWebPackPlugin({
        template: './src/index.html',
      }),
    ],
  },
});
