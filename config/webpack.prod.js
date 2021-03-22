const config = require('./webpack.config');
config.mode = 'production';
config.output.filename = 'formio.lodash.min.js';
module.exports = config;
