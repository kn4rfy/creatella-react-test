const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader'
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: './public/template.html',
			filename: './index.html'
		})
	],
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'public')
	}
}
