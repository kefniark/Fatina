'use strict';

const path = require('path');
const webpack = require('webpack');
const optimizeJsPlugin = require("optimize-js-plugin");

// Object passed to webpack compiler
module.exports = {
	entry: {
		game: './src/index.ts'
	},
	output: {
		path: './build',
		filename: 'ftina.js',
		library: 'ftina',
		libraryTarget: 'umd'
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '']
	},
	devtool: "#cheap-module-inline-source-map",
	module: {
		loaders: [
			{ test: /\.tsx?$/, loader: 'ts-loader' }
		]
	},
	plugins: [],
	devServer: {
		contentBase: [path.join(__dirname, 'build'), path.join(__dirname)],
		compress: true,
		port: 8000
	}
};

// Check if we should run additional optimisations for production builds
const productionBuild = process.argv[1].indexOf('webpack') >= 0 && process.argv.indexOf('-p') >= 0;
if (!productionBuild) {
	return;
}

module.exports.devtool = false;
module.exports.plugins.push(
	new webpack.optimize.UglifyJsPlugin({
		compress: { warnings: false },
		minimize: true,
		include: /\.min\.js$/
    })
);
module.exports.plugins.push(
    new optimizeJsPlugin({
        sourceMap: false
    })
);

module.exports.output.filename = 'ftina.min.js';
