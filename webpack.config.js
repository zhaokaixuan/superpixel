const path = require('path');

module.exports = {
  entry: './src/main.js',
  devtool: 'inline-source-map',
  devServer:{
    contentBase:"./dist"
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};