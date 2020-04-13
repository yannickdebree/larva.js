"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = __importStar(require("path"));
var webpack = __importStar(require("webpack"));
var HtmlWebPackPlugin = require('html-webpack-plugin');
var projectPath = process.argv[1].replace('/node_modules/.bin/snake', '');
function getWebpackConfig() {
    return {
        target: 'web',
        mode: process.env.NODE_ENV || 'development',
        devtool: 'source-map',
        entry: {
            main: path.resolve(projectPath, './src/main.ts')
        },
        output: {
            path: path.resolve(projectPath, './dist')
        },
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    loader: ['awesome-typescript-loader'],
                    exclude: [/node_modules/]
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    enforce: 'pre'
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'html-loader',
                            options: { minimize: process.env.NODE_ENV === 'production' }
                        }
                    ]
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.js']
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebPackPlugin({
                template: path.resolve(projectPath, './public/index.html'),
                filename: 'index.html'
            })
        ],
        devServer: {
            stats: {
                children: false,
                maxModules: 0
            },
            compress: true,
            host: 'localhost',
            port: 8080,
            watchContentBase: true
        }
    };
}
exports.getWebpackConfig = getWebpackConfig;
