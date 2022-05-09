const path = require('path');

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: './html-tabs.js',
  output: {
    filename: 'html-tabs.js',
    path: path.resolve(__dirname, 'tests'),
  },
  devServer: {
    static: path.join(__dirname, 'tests'),
    compress: true,
    port: 9000
  }
}
