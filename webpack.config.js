var path = require('path');
var webpack = require('webpack');

module.exports = {
 entry: './public/index.js',
 mode: "development",
 output: {
   path: path.join(__dirname, 'public'),
   filename: 'bundle.js'
 },
 module: {
  rules: [{
    test: /\.(js|jsx)$/, // include .js and jsx files
    loader: 'babel-loader',
    exclude: /node_modules/, //exclude any and all files in the node_modules folder
    query: { presets: ["@babel/preset-env"]}
  },
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: ['babel-loader', 'eslint-loader']
  },
  {
    test: /\.css$/,
    loader: "style-loader!css-loader"
  }]
 }
}
