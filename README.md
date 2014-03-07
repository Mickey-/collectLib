# lib池
-----
## 这是什么

__非kissy、非dpl__,商家前端(sj)应用所依赖的三方库文件cdn存放地。

## 背景


1. 商家业务产品线非常广，每个应用都需要依赖一些__公共库文件__，以前的情况是各应用自己__人肉引用__需要的库，每个新应用都要重新搜索一次各个库文件并__拷贝__至应用目录下。
2. 脚手架及构建脚本大面积普及后，关于放在应用内的lib库文件，如何处理开发、上线态的库文件分歧也较多，有建议放src里，有建议放build里，也有建议划分grunt阶段任务处理。
3. 不同应用lib库的引用版本较为混乱，各个版本都有。

## 这里做了什么

建立lib库的单独仓库，利用__bower__管理lib版本的依赖，利用__gulp__处理bower最终文件并导出到build目录。     
线上调试需求可以将bower包的lib源码何map source加入build/。    

下面是目前已加入的lib文件，大家有其他需要可以再加入。
大家自己添加lib库后请__自行扩充__下面列表，方便其他同学知晓、引用。

1. jquery : http://g.tbcdn.cn/sj/lib/jquery.min.js
2. angular : http://g.tbcdn.cn/sj/lib/angular.min.js
3. backbone : http://g.tbcdn.cn/sj/lib/backbone.min.js
4. underscore : http://g.tbcdn.cn/sj/lib/underscore.min.js
5. highcharts : http://g.tbcdn.cn/sj/lib/highcharts.min.js


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
    lib file has generated in build/ ------ jquery.min.js
    lib file has generated in build/ ------ backbone.min.js
    lib file has generated in build/ ------ underscore.min.js
    lib file has generated in build/ ------ angular.min.js
    lib file has generated in build/ ------ highcharts.min.js
```

可以去build目录查看文件是否正确，之后走常规的tag、push发布流程，即可发布线上。

以后需要添加，直接执行3、4步骤即可。




## 注：

* 如果是更新文件，一定要注意检查库文件更新后是否正确！以免意外造成多个应用js报错！
* bower.json的键名__不要带.js后缀名__
* 
* 对于lib文件版本升级，一定要注意新版本__不向下兼容__的部分对已有应用会不会有影响
