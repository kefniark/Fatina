"use strict";

const path = require("path");
const WebpackShellPlugin = require("webpack-shell-plugin");
const WebpackAutoInject = require("webpack-auto-inject-version");

module.exports = {
	mode: "development",
	entry: {
		Fatina: "./src/index.ts",
		fatinaBezier: "./src/plugins/bezier/index.ts",
		fatinaPreset: "./src/plugins/preset/index.ts"
	},
	output: {
		path: path.resolve(__dirname, "build"),
		filename: (arg) => {
			if (arg.chunk.name === "Fatina") {
				return "fatina.js";
			}
			return "plugins/[name].js";
		},
		library: "[name]",
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
			onBuildEnd: ["node tools/fix-dev.js"],
			dev: true
		}),
		new WebpackAutoInject({
			SHORT: "Fatina",
			SILENT: true,
			components: {
				AutoIncreaseVersion: false,
				InjectAsComment: true,
				InjectByTag: true
			},
			componentsOptions: {
				InjectAsComment: {
					tag: "Build: {version} - {date}"
				}
			}
		})
	],
	devServer: {
		contentBase: [
			path.join(__dirname, "./build"),
			path.join(__dirname, "./samples")
		],
		index: "samples/index.html"
	}
};
