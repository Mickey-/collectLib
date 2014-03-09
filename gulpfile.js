
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
                fileName,
                fullFilePath,
                rs;
            //如果有以.min.js结尾的文件则表示bower包完整，结束;反正处理。
            if (!minFilePath) {
                //判断v是否是其他版本如jquery-2.1.0,如果是则剔除版本号以寻找文件名。
                fileName = v.replace(/-\d\.\d\.\d$/, '') + '.js';
                fullFilePath = ff.findFile(fileName + '<$>');
                if (fullFilePath) {
                    rs = gulp.src(fullFilePath).pipe(uglify({preserveComments: 'some'})).pipe(rename(v + '.min.js'));
                } else {
                    console.log('该文件在包中命名不规则，请手动复制到build/目录中 ------ ' + (v).red);
                    return;
                }
                //rs.pipe(gulp.dest('./build/'));
                rs.pipe(gulp.dest(fullFilePath.replace(new RegExp(fileName + '$'), '')));
            }
            console.log(' lib file has generated in build/ ------ ' + (v + '.min.js').green);
        });
    }
})
