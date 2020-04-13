import { clear } from 'kernel';
import * as path from 'path';

// const webpack = require('webpack');
// const webpackConfig = require('./webpack.config');
// const WebpackDevServer = require('webpack-dev-server');

export function serveRgx() {
  return /^serve$/gm;
}

export function serve(): void {
  clear();
  console.log(path.resolve(__dirname));
  // console.clear();
  // const config = { ...webpackConfig };
  // config.mode = process.env.NODE_ENV || 'development';
  // const host = config.devServer.host;
  // const port = config.devServer.port;
  // const frontendUrl = `http://${host}:${port}`;
  // config.entry[process.env.npm_package_name].unshift(
  //   `webpack-dev-server/client?${frontendUrl}/`,
  //   'webpack/hot/dev-server'
  // );
  // const compiler = webpack(config);
  // const server = new WebpackDevServer(compiler, config.devServer);
  // server.listen(port, host, error => {
  //   if (error) {
  //     warn(error);
  //   }
  // });
}
