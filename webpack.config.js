"use strict";

const path = require("path");
const webpack = require("webpack");

// Generate the description file d.ts
function DtsBundlePlugin() { }
DtsBundlePlugin.prototype.apply = function (compiler) {
	compiler.plugin("done", function () {
		var dts = require("dts-bundle");

		dts.bundle({
			name: "Fatina",
			baseDir: "lib",
			main: "./lib/src/fatina/index.d.ts",
			out: "../build/fatina.d.ts",
			exclude: (file, external) => {
				return file.indexOf("tests") !== -1;
			},
			removeSource: true,
			verbose: false,
			outputAsModuleFolder: true // to use npm in-package typings
		});
	});
};

module.exports = {
	entry: {
		"fatina": "./src/fatina/index.ts",
		"fatina.min": "./src/fatina/index.ts"
	},
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "[name].js",
		library: "Fatina",
		libraryTarget: "umd",
		umdNamedDefine: true
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js"]
	},
	devtool: "source-map",
	module: {
		rules: [
			{ test: /\.tsx?$/, loader: "ts-loader" }
		]
	},
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			comments: false,
			include: /\.min\.js$/
		}),
		new DtsBundlePlugin()
	]
};
