import { info, warn } from '../kernel';
import { checkSnakeFile, getWebpackConfig } from '../shared';
const webpack = require('webpack');

export function buildRgx() {
  return /^build$/gm;
}

export async function build(): Promise<void> {
  await checkSnakeFile();

  const config = getWebpackConfig({ mode: 'production' });

  const compiler = webpack(config);

  compiler.run((err, stats) => {
    if (err) {
      warn(err);
    }

    const informations = stats.toJson();

    if (stats.hasErrors()) {
      warn(informations.errors.join('\n\n'));
    }

    if (stats.hasWarnings()) {
      warn(informations.warnings.join('\n\n'));
    }

    info('Compiled successfully !');
  });
}
