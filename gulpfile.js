
var LIBS = Object.keys(require('./bower.json').dependencies);

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    colors = require('colors'),
    //exec = require('child_process').exec,
    execSync = require('execSync'),
    sys = require('sys'),
    finder = require('fs-finder');

gulp.task('default', function() {
    console.log('\nchecking and downloading...'.grey);
    var ret = execSync.exec('bower install');
    console.log(ret.stdout);
    disposeEachLib();
    function disposeEachLib (){
        LIBS.forEach(function(v, k){
            var ff = finder.from('./build/' + v),
                minFilePath = ff.findFile(v + '.min.js'),
                fileName,
                fullFilePath,
                rs;
            //如果有以.min.js结尾的文件则表示bower包完整，结束;反正处理。
            if (!minFilePath) {
                //判断v是否是其他版本如jquery-2.1.0,如果是则剔除版本号以寻找文件名。
                //再判断是否是形如requirejs的库，注册名为requirejs，文件名为require.js而不是requirejs.js
                fileName = v.replace(/-\d\.\d\.\d$/, '').replace(/js$/, '') + '.js';
                fullFilePath = ff.findFile(fileName + '<$>');
                if (fullFilePath) {
                    rs = gulp.src(fullFilePath).pipe(uglify()).pipe(rename(v + '.min.js'));
                } else {
                    console.log('该文件在包中命名不规则，请检查bower.json或手动处理到对应目录中 ------ ' + (v).red);
                    return;
                }
                rs.pipe(gulp.dest(fullFilePath.replace(new RegExp(fileName + '$'), '')));
            }
            console.log(' lib files have generated in build/ ------ ' + v.green);
        });
    }
})
