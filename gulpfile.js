
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
    var ret = execSync.exec('bower install'),
        minjsSuffix = '.min.js';
    console.log(ret.stdout);
    disposeEachLib();
    function disposeEachLib (){
        LIBS.forEach(function(v, k){
            var ff = finder.from('./build/' + v),
                //replace1:将xxx-2.1.0替换为xxx
                //replace2:将名叫xxxjs的组件替换为xxx.js而不是xxxjs.js(如requirejs)
                fileName = v.replace(/-\d\.\d\.\d$/, '').replace(/js$/, '') + '.js',
                finalMinFileName = fileName.replace(/\.js$/, minjsSuffix),
                //利用正则使查找时不区分文件名大小写
                minFilePath = ff.findFile('<' + getRegIgnorecase(finalMinFileName) + '$>'),
                fullFilePath = ff.findFile('<' + getRegIgnorecase(fileName) + '$>');
            //如果有以.min.js结尾的文件则表示bower包完整，结束;反正处理。
            if (!minFilePath) {
                //判断v是否是其他版本如jquery-2.1.0,如果是则剔除版本号以寻找文件名。
                if (fullFilePath) {
                    gulp.src(fullFilePath)
                        .pipe(uglify())
                        .pipe(rename(finalMinFileName))
                        .pipe(gulp.dest(fullFilePath.replace(new RegExp(fileName + '$'), '')));
                } else {
                    console.log('该文件在包中命名不规则，请检查bower.json或手动处理到对应目录中 ------ ' + (v).red);
                    return;
                }
            }
            console.log(' lib files have generated in build/ ------ ' + (v + '/').green);
        });
    }
    //获得str不区分大小写的正则
    function getRegIgnorecase(str) {
        return str.split('').map(
            function(v,k) {
                return '[' + v + v.toUpperCase() + ']'
            }
        ).join('');
    }
})
