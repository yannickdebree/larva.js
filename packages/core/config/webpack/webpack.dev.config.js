const config = require('./webpack.config');

module.exports = { ...config, devtool: 'inline-source-map', mode: 'development', watch: true };
