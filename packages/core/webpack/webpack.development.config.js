const config = require('./webpack.config');

module.exports = { ...config, devtool: 'source-map', mode: 'development', watch: true };
