"use strict";

const path = require("path");
const ClosurePlugin = require('closure-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const TypedocWebpackPlugin = require('typedoc-webpack-plugin');

module.exports = {
	mode: "production",
	entry: "./src/index.ts",
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "fatina.min.js",
		library: "Fatina",
		libraryTarget: "umd",
		umdNamedDefine: true,
		globalObject: "typeof self !== 'undefined' ? self : this"
	},
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
			onBuildEnd: ['node tools/fix-prod.js']
		}),
		new TypedocWebpackPlugin({
			name: 'Fatina',
			theme: 'minimal',
			out: './docs',
			mode: 'file',
			excludePrivate: true,
			excludeProtected: true
		}, './src/')
	],
	optimization: {
		concatenateModules: false,
		minimizer: [
			new ClosurePlugin({
				mode: 'STANDARD'
			}, {
				languageIn: "ECMASCRIPT6",
				languageOut: 'ECMASCRIPT6',
				compilation_level: 'SIMPLE'
			})
		]
	}
};
