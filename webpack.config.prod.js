"use strict";

const path = require("path");
const ClosurePlugin = require("closure-webpack-plugin");
const WebpackShellPlugin = require("webpack-shell-plugin");
const TypedocWebpackPlugin = require("typedoc-webpack-plugin");
const WebpackAutoInject = require("webpack-auto-inject-version");

module.exports = {
	mode: "production",
	entry: {
		Fatina: "./src/index.ts",
		fatinaBezier: "./src/plugins/bezier/index.ts",
		fatinaPreset: "./src/plugins/preset/index.ts"
	},
	output: {
		path: path.resolve(__dirname, "build"),
		filename: (arg) => {
			if (arg.chunk.name === "Fatina") {
				return "fatina.min.js";
			}
			return "plugins/[name].min.js";
		},
		library: "[name]",
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
			onBuildEnd: ["node tools/fix-prod.js"]
		}),
		new TypedocWebpackPlugin({
			name: "Fatina",
			theme: "minimal",
			out: "./docs",
			mode: "file",
			excludePrivate: true,
			excludeProtected: true
		}, "./src/"),
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
	optimization: {
		concatenateModules: false,
		minimizer: [
			new ClosurePlugin({
				mode: "STANDARD"
			}, {
				language_in: "ECMASCRIPT_2017",
				language_out: "ECMASCRIPT6"
			})
		]
	}
};
