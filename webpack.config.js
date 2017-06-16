'use strict';

const path = require('path');
const webpack = require('webpack');
const optimizeJsPlugin = require("optimize-js-plugin");

// Object passed to webpack compiler
module.exports = {
	entry: {
		'fatina': './src/fatina/index.ts',
		'fatina.min': './src/fatina/index.ts'
	},
	output: {
		path: './build',
		filename: '[name].js',
		library: 'Fatina',
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
		new DtsBundlePlugin()
	],
	devServer: {
		contentBase: [path.join(__dirname, 'samples'), path.join(__dirname, 'build'), path.join(__dirname)],
		compress: true,
		port: 8000
	}
};

function DtsBundlePlugin(){}
DtsBundlePlugin.prototype.apply = function (compiler) {
	compiler.plugin('done', function () {
		var dts = require('dts-bundle');

		dts.bundle({
			name: 'Fatina',
			baseDir: 'lib',
			main: './lib/src/fatina/index.d.ts',
			out: '../build/fatina.d.ts',
			exclude: function(file, external) {
				return file.indexOf('tests') !== -1;
			},
			removeSource: true,
			verbose: false,
			outputAsModuleFolder: true // to use npm in-package typings
		});
	});
};
