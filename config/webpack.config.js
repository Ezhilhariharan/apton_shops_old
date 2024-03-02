const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { ANTD_THEME } = require('../src/theme');

module.exports = ({ entryDir, outputDir, htmlPath }) => ({
  devtool: 'source-map',
  entry: path.join(__dirname, entryDir),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, outputDir),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      '@modules': path.join(__dirname, '../src/modules'),
      '@components': path.join(__dirname, '../src/components'),
      '@theme': path.join(__dirname, '../src/theme'),
      '@utils': path.join(__dirname, '../src/utils'),
      '@routes': path.join(__dirname, '../src/routes'),
      '@assets': path.join(__dirname, '../src/assets'),
      '@hooks': path.join(__dirname, '../src/hooks'),
      '@public': path.join(__dirname, '../public'),
    },
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'ASP_API_URL',
      'WHATSAPP_CSV_URL',
      'WP_CALL_BACK_URL',
      'WP_VERIFY_TOKEN',
      'APP_MODE',
      'CUSTOMER_CONTACT_CSV_URL',
      'API_BASEURL',
      'UNSPLASH_IMAGES'
    ]),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, htmlPath),
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      {
        test: /\.(less)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: ANTD_THEME,
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
});
