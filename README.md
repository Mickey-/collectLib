# 三方lib仓库
-----
## 这是什么

 __非kissy、非dpl__ ,商家前端(sj)应用所依赖的三方库文件cdn存放地。

## 背景


1. 商家业务产品线非常广，每个应用都需要依赖一些 __公共库文件__ ，以前的情况是各应用自己 __人肉引用__ 需要的库，每个新应用都要重新搜索一次各个库文件并 __拷贝__ 至应用目录下。
2. 脚手架及构建脚本大面积普及后，关于放在应用内的lib库文件，如何处理开发、上线态的库文件分歧也较多，有建议放src里，有建议放build里，也有建议划分grunt阶段任务处理。
3. 不同应用lib库的引用版本较为混乱，各个版本都有。

## 这里做了什么

建立lib库的单独仓库，利用 __bower__ 管理lib的版本和依赖，利用 __gulp__ 处理bower最终文件并导出到build目录。     
关于线上调试需求，已将bower包生成目录指定为build，lib源码和map source(如果有)都会发布到cdn。。    


__**结合@惟明的建议，改造了各脚本和目录结构，以适应多版本lib需求**__小版本差异建议统一，统一的版本不会在路径中显示版本号，可在bower.json中查看。

大家自己添加lib库后请 __自行扩充__ 下面列表，方便其他同学知晓、引用。

1. jquery : http://g.tbcdn.cn/sj/lib/jquery/dist/jquery.min.js
1. jquery-2.1.0: http://g.tbcdn.cn/sj/lib/jquery-2.1.0/dist/jquery.min.js
1. angular : http://g.tbcdn.cn/sj/lib/angular/angular.min.js
1. backbone : http://g.tbcdn.cn/sj/lib/backbone/backbone.min.js
1. underscore : http://g.tbcdn.cn/sj/lib/underscore/underscore.min.js
1. highcharts : http://g.tbcdn.cn/sj/lib/highcharts/highcharts.min.js
1. highcharts(需要使用地图图表) : http://g.tbcdn.cn/sj/lib/highcharts/??highcharts.min.js,map-module.js,chnmap.js
1. requirejs : http://g.tbcdn.cn/sj/lib/requirejs/require.min.js
1. ZeroClipboard : http://g.tbcdn.cn/sj/lib/zeroclipboard/ZeroClipboard.min.js


应该说，大部分时候大家是不需要关心这个仓库的细节的，只需要在项目初始化时引用这里的lib文件，不过对于

1. 新起项目
2. 升级大版本号

那么就需要修改仓库内容，可以看下面

## 如何维护更新lib

该库已设置为覆盖式发布，几个步骤：

1. clone仓库，新建daily分支。
2. 安装全局命令 `npm install -g gulp bower`。在package.json目录执行安装依赖 `npm install` 
3. 在bower.json的dependencies字段添加lib库
4. 直接执行 `gulp`

```
    "dependencies": {
        "jquery": "~1.11.0"
        ,"jquery-2.1.0": "git://github.com/jquery/jquery.git#2.1.0"
        ,"backbone": "~1.1.2"
        ,"underscore": "~1.6.0"
        ,"angular": "~1.2.14"
        ,"highcharts": "~3.0"
        //,add new lib
    }
```

这里没有grunt，因为仅是简单的包管理需求，没有用任务堆积grunt的必要，权当大家了解gulp: )

看到如下提示后

```
    lib files have generated in build/ ------ jquery/
    lib files have generated in build/ ------ jquery-2.1.0/
    lib files have generated in build/ ------ backbone/
    lib files have generated in build/ ------ underscore/
    lib files have generated in build/ ------ angular/
    lib files have generated in build/ ------ highcharts/
```

之后走常规的tag、push发布流程，即可发布线上。

以后需要添加，直接执行3、4步骤即可。

## 一些例外

如果希望引入一些lib派生文件，且文件体积太大不愿合并进lib文件,
因为lib文件较少，且多是一次性操作，以后便不用关心，故不使用自动化脚本，手工拷贝进build/即可。

angular1.3不再支持IE8，所以要支持IE8的话只能用1.2+的，千牛使用可以单独开一条规则


# 注：

* 如果是更新文件，一定要注意检查库文件更新后是否正确！以免意外造成多个应用js报错！
* bower.json的键名  __不要带.js后缀名__ ，如果要自定义版本号， __一定要__ 是类似 __xxx-2.4.2__ 这种格式。
* 对于lib文件版本升级，一定要注意新版本 __不向下兼容__ 的部分对已有应用会不会有影响。
* 避免上述问题，可以在发布前发一个```merge request```复查一下。

<br><br>



