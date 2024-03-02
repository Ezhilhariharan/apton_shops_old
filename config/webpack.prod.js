const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const createWebpackBase = require('./webpack.config');

const baseWebpackConfig = (module.exports = createWebpackBase({
  entryDir: '../src/index.js',
  outputDir: '../build',
  htmlPath: '../src/index.html',
}));

const prodWebpackConfig = {
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 10,
    },
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, '../build'),
  },
};

module.exports = merge(baseWebpackConfig, prodWebpackConfig);
