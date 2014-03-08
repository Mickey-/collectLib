
var LIBS = Object.keys(require('./bower.json').dependencies);

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    colors = require('colors'),
    exec = require('child_process').exec,
    sys = require('sys'),
    finder = require('fs-finder');

gulp.task('default', function() {
    //TODO 同步exec
    exec("bower install", extract);
    //循环体v为各个库文件名，如“jquery”，“underscore”
    function extract (error, stdout, stderr){
        sys.puts(stdout);
        LIBS.forEach(function(v, k){
            var ff = finder.from('./build/' + v),
                minFilePath = ff.findFile(v + '.min.js'),
                fullFilePath,
                rs;
                console.log('min'.yellow + minFilePath)
            if (!minFilePath) {
                //判断v是否是其他版本如jquery-2.1.0,如果是则剔除版本号
                fullFilePath = ff.findFile(v.replace(/-\d\.\d\.\d$/, '') + '.js<$>');
                console.log('full'.blue + fullFilePath)
                if (fullFilePath) {
                    rs = gulp.src(fullFilePath).pipe(uglify()).pipe(rename(v + '.min.js'));
                } else {
                    console.log('该文件在包中命名不规则，请手动复制到build/目录中 ------ ' + (v).red);
                    return; 
                }
                //rs.pipe(gulp.dest('./build/'));
                rs.pipe(gulp.dest(fullFilePath.replace(v + '.js', '')));
            }
            console.log(' lib file has generated in build/ ------ ' + (v + '.min.js').green);
        });
    }
})
