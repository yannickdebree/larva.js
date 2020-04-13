import { clear, info, warn } from '../../kernel';
import { getWebpackConfig } from './config';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

export function serveRgx() {
  return /^serve$/gm;
}

export async function serve(): Promise<void> {
  const config = { ...getWebpackConfig(), mode: process.env.NODE_ENV || 'development' };

  const { host, port } = config.devServer;

  const compiler = webpack(config);

  const server = new WebpackDevServer(compiler, config.devServer);

  server.listen(port, host, error => {
    clear();
    info(`Project is running at http://${host}:${port}`);
    if (error) {
      warn(error);
    }
  });
}
