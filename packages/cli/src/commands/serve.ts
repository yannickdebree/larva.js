import { clear, info, warn } from '../kernel';
import { checkLarvaFile, getWebpackConfig } from '../shared';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

export function serveRgx() {
  return /^serve$/gm;
}

export async function serve(): Promise<void> {
  await checkLarvaFile();

  const config = getWebpackConfig();

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
