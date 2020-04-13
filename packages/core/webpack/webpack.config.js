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
    filename: 'core.min.js',
    path: path.resolve(__dirname, '../dist')
  },
  resolve: {
    extensions: ['.ts']
  }
};
