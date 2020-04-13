const DeclarationBundlerPlugin = require('./plugins/declaration-bundler-plugin');

const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, '../src/main.ts'),
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts?$/,
        use: 'ts-loader'
      }
    ]
  },
  output: {
    filename: 'core.js',
    path: path.resolve(__dirname, '../dist')
  },
  plugins: [
    new DeclarationBundlerPlugin({
      moduleName: 'snake.js.core',
      out: 'core.d.ts'
    })
  ],
  resolve: {
    extensions: ['.ts']
  }
};
