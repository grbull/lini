const path = require('path');
require('dotenv').config();
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dotenvWebpack = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    main: path.join(__dirname, 'src/client/index.tsx'),
  },
  output: {
    path: path.join(__dirname, 'dist/client'),
    filename: '[name].[hash].js',
    publicPath: '/',
  },
  plugins: [
    // https://webpack.js.org/plugins/html-webpack-plugin/
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html'),
    }),
    // https://github.com/webpack-contrib/mini-css-extract-plugin
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    }),
    // https://github.com/mrsteele/dotenv-webpack
    new dotenvWebpack(),
    // https://webpack.js.org/plugins/copy-webpack-plugin/
    new CopyPlugin({ patterns: [{ from: 'public/static' }] }),
    new WorkboxPlugin.InjectManifest({
      swSrc: path.join(__dirname, 'src/client/sw.ts'),
      swDest: 'sw.js',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts[x]?$/i,
        loader: 'ts-loader',
        include: path.join(__dirname, 'src/client'),
        exclude: /node_modules/,
        options: {
          configFile: 'tsconfig.client.json',
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  devServer: {
    port: process.env.CLIENT_PORT,
    historyApiFallback: true,
    host: '0.0.0.0',
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};
