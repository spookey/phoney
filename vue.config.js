const glob = require('glob-all');
const path = require('path');
const PurgecssPlugin = require('purgecss-webpack-plugin');

module.exports = {
  configureWebpack: {
    plugins: [
      new PurgecssPlugin({
        paths: glob.sync([
          path.join(__dirname, 'public', 'index.html'),
          path.join(__dirname, 'src', '**', '*.vue'),
          path.join(__dirname, 'src', '**', '*.js'),
        ]),
      }),
    ],
  },
};
