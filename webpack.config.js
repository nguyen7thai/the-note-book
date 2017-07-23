const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')

var config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index-bundle.js'
  },
  resolve: {
    extensions: ['.js', '.scss'],
    alias: {
      components: path.resolve('./src/components'),
      api: path.resolve('./src/api'),
      modules: path.resolve('./src/modules'),
      selectors: path.resolve('./src/selectors'),
      constants: path.resolve('./src/constants'),
      stylesheets: path.resolve('./src/stylesheets')
    }
  },
  module: {
    rules: [
      {
        test: /.*\.(js)$/,
        use: ['react-hot-loader', 'babel-loader'],
        exclude: /(node_modules|functions)/
      },
      {
        test: /.*\.s?css$/,
        use: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          'sass-loader'
        ]
      }
    ]
  },
  devtool: 'cheap-module-inline-source-map',
  plugins: [new HtmlWebpackPlugin({
    template: 'src/index.html'
  })]
}

if (process.env.NODE_ENV === 'production') {
  config.devtool = 'cheap-module-source-map'
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      comments: false
    })
  )
}

module.exports = config
