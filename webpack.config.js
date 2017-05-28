'use strict';

const path = require('path');
const webpack = require('webpack');
const dtsBundlerPlugin = require('dtsbundler-webpack-plugin');
const optimizeJsPlugin = require("optimize-js-plugin");

// Object passed to webpack compiler
module.exports = {
	entry: {
		'fatina': './src/fatina/index.ts',
		'fatina.min': './src/fatina/index.ts',
		'fatina-css': './src/plugins/css/index.ts',
		'fatina-css.min': './src/plugins/css/index.ts',
	},
	output: {
		path: './build',
		filename: '[name].js',
		library: 'fatina',
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '']
	},
	devtool: "source-map",
	module: {
		loaders: [
			{ test: /\.tsx?$/, loader: 'ts-loader' }
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			sourceMap: true,
			include: /\.min\.js$/,
		}),
		new dtsBundlerPlugin({
            out:'./fatina.d.ts',
        })
	],
	devServer: {
		contentBase: [path.join(__dirname, 'samples'), path.join(__dirname, 'build'), path.join(__dirname)],
		compress: true,
		port: 8000
	}
};
