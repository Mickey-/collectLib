
var LIBS = Object.keys(require('./bower.json').dependencies),
    root = './bower_components/';

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    colors = require('colors'),
    exec = require('child_process').exec,
    sys = require('sys'),
    finder = require('fs-finder');

gulp.task('default', function() {
    //bower.commands.install(LIBS, {save: true});
    exec("bower install", extract);
    //循环体v为各个库文件名，如“jquery”，“underscore”
    function extract (error, stdout, stderr){
        sys.puts(stdout);
        LIBS.forEach(function(v, k){
            var ff = finder.from(root + v),
                minFileName = ff.findFile(v + '<.>min.js'),
                fullFileName,
                rs;
            if (minFileName) {
                rs = gulp.src(minFileName);
            } else {
                fullFileName = ff.findFile(v + '.js<$>');
                if (fullFileName) {
                    rs = gulp.src(fullFileName).pipe(uglify()).pipe(rename(v + '.min.js'));
                } else {
                    console.log('该文件在包中命名不规则，请手动复制到build/目录中 ------ ' + (v).red);
                    return; 
                }
            }
            rs.pipe(gulp.dest('./build/'));
            console.log(' lib file has generated in build/ ------ ' + (v + '.min.js').green);
        });
    }
})
