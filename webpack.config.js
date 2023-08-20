const path = require('path');

module.exports = {

	entry: './ts/src/script.ts',

	mode: 'production',

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
			}
		]
	},

	resolve: {
		extensions: [".ts", ".tsx", ".js"],
	},

	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, './ts'),
	},

	cache: {
		type: 'filesystem',
	},
};