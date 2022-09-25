const webpack = require('webpack')
const path = require('path')

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('sample'),
    }),
  ],
  entry: path.resolve(__dirname, '..', './sample/index.tsx'),
}
