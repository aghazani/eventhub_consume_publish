const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path-browserify')
const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: 'static/js/[name].[contenthash].js',
    path: path.resolve('./build'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { modules: true } },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new HtmlWebpackPlugin({ template: './src/index.html' }),

    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    fallback: {
      buffer: require.resolve('buffer/'),
      os: require.resolve('os-browserify'),
      path: require.resolve('path-browserify'),
    },
  },
  devServer: {
    static: './build',
    hot: true,
    historyApiFallback: true,
  },
}
