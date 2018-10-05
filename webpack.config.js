module.exports = {
  entry: {
    src: './frontend/src/index.js'
  },
  output: {
    filename: 'main.js',
    path: __dirname + '/static/build/js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};