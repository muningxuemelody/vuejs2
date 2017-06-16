var webpack = require('webpack');
var ET = require('extract-text-webpack-plugin');
module.exports = {
		entry: __dirname + '/src/app.js',
	output: {
		path: __dirname + '/prd',
		// filename:'[name]-[hash].js'
		filename:'bundle.js'
	},
	devtool: 'source-map',

	module: {
		loaders:[
			{ 
				test: /\.css$/,
			 	loader: "style-loader!css-loader"
			},
			{
				test:/\.js$/,
				loader:'babel-loader?presets[]=es2015'
			},
			{
				test:/\.scss$/,
				// loader:'style!css!sass'
				loader: ET.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' })
			},
			{
				test:/\.string$/,
				loader:'string-loader'
			}
		]
	}, 

	devServer:{
		contentBase: __dirname + '/prd',
		port:80,
		host:'localhost',
		proxy:{
			"/api": {
				target:'http://localhost:9000',
				pathRewrite:{
					'^/api':''

				}
			}
		}
	},
	plugins:[
	new webpack.optimize.UglifyJsPlugin(),
	 new ET('bundle.css')
	]
}