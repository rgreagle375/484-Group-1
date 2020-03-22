const path = require('path');
const fs = require('fs');
const webpack = require('webpack');


module.exports = {
        entry: {
            main: path.resolve(__dirname, 'src/index.js'),
        },
        
        resolve: {
            extensions: ['.js', '.json'],
        },
        target: "node",
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {   type: 'javascript/auto',
                    test: /\.json$/,
                    loader: 'json-loader'
                },   
            ],
            
        },
}