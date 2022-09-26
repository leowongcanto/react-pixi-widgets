const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: path.resolve(__dirname, '..', './src/index.tsx'),
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        // should use babel-loader for all ts js tsx and jsx files
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        // should use style-loader and css-loader for all css files
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        // v5 supports image loaders out of box
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, '..', './build-widgets'),
    filename: 'index.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('widgets'),
    }),
    new webpack.ProvidePlugin({
      PIXI: 'pixi.js',
    }),
  ],
}
