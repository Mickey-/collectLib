
var LIBS = Object.keys(require('./bower.json').dependencies),
    root = './bower_components/';

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require("gulp-rename"),
    colors = require("colors"),
    finder = require('fs-finder');

gulp.task('default', function() {
    //循环体v为各个库文件名，如“jquery”，“underscore”
    LIBS.forEach(function(v, k){
        var ff = finder.from(root + v),
            minFileName = ff.findFile(v + '<.>min.js'),
            fullFileName,
            rs;
        if (minFileName) {
            rs = gulp.src(minFileName);
        } else {
            fullFileName = ff.findFile(v + '.js');
            rs = gulp.src(fullFileName).pipe(uglify()).pipe(rename(v + '.min.js'));
        }
        rs.pipe(gulp.dest('./build/'));
        console.log(' lib file has generated in build/ ======== ' + (v + '.min.js').green);
    });

})
