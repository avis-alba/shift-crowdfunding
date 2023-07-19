const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const path = require('path');

module.exports = {
	context: __dirname,
	entry: './ts/src/script.ts',
	resolve: {
		extensions: [".ts", ".tsx", ".js"],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
			}
		]
	},
	plugins: [new ForkTsCheckerWebpackPlugin()],
	watchOptions: {
		ignored: /node_modules/,
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, './ts'),
	},
	mode: 'production'
};