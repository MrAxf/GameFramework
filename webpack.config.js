const path = require('path');

const config = {
	entry: './index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use:{
					loader: 'babel-loader',
					options:{
						presets: ['env', 'stage-3'],
						plugins: ['transform-class-properties'],
					}
				}
			}
		]
	},
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		port: 9000
	}
};

module.exports = config;