import * as path from 'path';
import * as webpack from 'webpack';
import { userPath } from '../kernel';
const HtmlWebPackPlugin = require('html-webpack-plugin');

const projectPath = userPath();

type WebpackOptions = any;

export function getWebpackConfig(options?: WebpackOptions): WebpackOptions {
  const config = {
    mode: process.env.NODE_ENV || 'development',
    target: 'web',
    entry: {
      main: path.resolve(projectPath, './src/main.ts')
    },
    output: {
      path: path.resolve(projectPath, './dist')
    },
    module: {
      rules: [
        {
          test: /\.ts?$/,
          loader: ['awesome-typescript-loader'],
          exclude: [/node_modules/]
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          enforce: 'pre'
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: { minimize: process.env.NODE_ENV === 'production' }
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebPackPlugin({
        template: path.resolve(projectPath, './public/index.html'),
        filename: 'index.html'
      })
    ],
    devServer: {
      stats: {
        children: false,
        maxModules: 0
      },
      compress: true,
      host: 'localhost',
      port: 8080,
      watchContentBase: true
    },
    ...options
  };

  if (config.mode === 'development') {
    config.devtool = 'source-map';
  }

  return config;
}
