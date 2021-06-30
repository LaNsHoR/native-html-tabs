const path = require('path');

module.exports = {
  entry: './html-tabs.js',
  output: {
    filename: 'html-tabs.js',
    path: path.resolve(__dirname, 'tests'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'tests'),
    compress: true,
    port: 9000
  }
}
