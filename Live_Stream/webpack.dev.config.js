const path = require('path');
const merge = require('webpack-merge');


module.exports = merge.smart(require('./webpack.config'), {
    mode: 'development',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
    },

    devServer: {
        contentBase: path.join(__dirname, 'src'),
        publicPath: '/',
        port: 3002,
    },

    // Include sourcemaps
    devtool: 'inline-source-map',

    // Keep running even if there are errors
    bail: false,
});
