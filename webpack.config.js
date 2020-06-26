const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'pub/js/main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
};
