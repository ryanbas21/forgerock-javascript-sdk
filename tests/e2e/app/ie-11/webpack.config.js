const path = require('path');

module.exports = {
  devtool: 'eval-source-map',
  entry: './index.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, ''),
    filename: 'autoscript.js'
  }
};
