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
      out: 'types.d.ts'
    })
  ],
  resolve: {
    alias: {
      '@_components': path.resolve(__dirname, '../src/components/'),
      '@_injectables': path.resolve(__dirname, '../src/injectables/'),
      '@_kernel': path.resolve(__dirname, '../src/kernel/'),
      '@_nodes': path.resolve(__dirname, '../src/nodes/'),
      '@_shared': path.resolve(__dirname, '../src/shared/'),
      '@_snake': path.resolve(__dirname, '../src/snake/')
    },
    extensions: ['.ts']
  }
};
