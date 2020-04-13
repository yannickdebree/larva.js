const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  target: 'web',
  mode: process.env.NODE_ENV || 'development',
  devtool: 'source-map',
  entry: {
    main: path.resolve('./src/main.ts')
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
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html'
    })
  ],
  devServer: {
    stats: {
      children: false,
      maxModules: 0
    },
    compress: true,
    host: '0.0.0.0',
    port: 8080,
    watchContentBase: true
  }
};
