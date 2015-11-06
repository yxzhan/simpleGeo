var path = require("path");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './modules/main.js',
    output: {
        path: path.resolve(__dirname),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: 'style!css'},
            {test: /\.less$/, loader: 'style!css!less'},
            {test: /\.html$/, loader: 'html'}
        ],
        plugins: [
            new ExtractTextPlugin("styles.css")
        ]
    }
}; 