var gulp = require('gulp');
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");

gulp.task("default", ["build","webpack-dev-server"]);

gulp.task('webpack', function(callback) {
    // run webpack
    var myConfig = Object.create(webpackConfig);
    myConfig.progress = true;
    myConfig.colors = true;
    //myConfig.watch = true;
    webpack(myConfig, function() {
        callback();
    });
});

gulp.task("build", ["webpack"], function() {
    gulp.watch(["./index.html", './modules/**'], ["webpack"]);
});

gulp.task("webpack-dev-server", function(callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    // Start a webpack-dev-server
    new WebpackDevServer(webpack(myConfig), {
        publicPath: "/" + myConfig.output,
        stats: {
            colors: true
        }
    }).listen(3000, "localhost", function(err) {

        });
});