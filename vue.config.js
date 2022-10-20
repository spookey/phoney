const glob = require('glob-all');
const path = require('path');
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');

module.exports = {
  productionSourceMap: false,

  configureWebpack: {
    plugins: [
      new PurgeCSSPlugin({
        paths: glob.sync([
          path.join(__dirname, 'public', 'index.html'),
          path.join(__dirname, 'src', '**', '*.vue'),
          path.join(__dirname, 'src', '**', '*.js'),
        ]),
      }),
    ],

    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      },
    },
  },
};
