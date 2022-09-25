const webpack = require('webpack')
const path = require('path')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('dev'),
    }),
  ],
  entry: path.resolve(__dirname, '..', './sample/index.tsx'),
}
