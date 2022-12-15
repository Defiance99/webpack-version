const path = require('path');
const { defineConfig } = require('@vue/cli-service');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: 'http://localhost:3002/',
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
    entry: path.resolve(__dirname, './src/index.ts'),
    plugins: [
      new ModuleFederationPlugin({
        name: 'wysiwyg',
        filename: 'remoteEntry.js',
        exposes: {
          './WEditor': './src/components/WEditor',
        },
        // shared: require('./package.json').dependencies,
        shared: {
          vue: {
            eager: true,
            singleton: true,
          },
        },
      }),
    ],
    devServer: {
      port: 3002,
    },
  },
});
