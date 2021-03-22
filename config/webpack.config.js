const path = require('path');
module.exports = {
  mode: 'development',
  entry: `./lib/index.js`,
  output: {
    library: '_',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, '../dist'),
    filename: 'formio.lodash.js',
    environment: {
      arrowFunction: false
    },
  }
};
