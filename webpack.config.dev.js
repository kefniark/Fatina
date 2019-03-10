"use strict";

const path = require("path");
const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
	mode: "development",
	entry: "./src/index.ts",
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "fatina.js",
		library: "Fatina",
		libraryTarget: "umd",
		umdNamedDefine: true,
		globalObject: "typeof self !== 'undefined' ? self : this"
	},
	devtool: "source-map",
	resolve: {
		extensions: [".ts", ".tsx", ".js"]
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{ loader: "ts-loader" }
				]
			}
		]
	},
	plugins: [
		new WebpackShellPlugin({
			onBuildEnd: ['node tools/fix-dev.js'],
			dev: true
		})
	],
	devServer: {
		contentBase: [path.join(__dirname, './build'), path.join(__dirname, './samples')],
		index: 'samples/index.html'
	}
};
