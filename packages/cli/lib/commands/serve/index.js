"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var kernel_1 = require("kernel");
var path = __importStar(require("path"));
// const webpack = require('webpack');
// const webpackConfig = require('./webpack.config');
// const WebpackDevServer = require('webpack-dev-server');
function serveRgx() {
    return /^serve$/gm;
}
exports.serveRgx = serveRgx;
function serve() {
    kernel_1.clear();
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
exports.serve = serve;
