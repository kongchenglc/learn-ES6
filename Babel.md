# Babel常用

## .babelrc配置文件
写配置文件是使用`Babel`第一步，所有`Babel`工具和模块的使用，都必须先写好`.babelrc`。  
`presets`用来指定一些转码规则：
```json
{
    "presets": [
        "es2015",
        "react",
        "stage-2"
    ],
    "plugins": []
}
```

## 命令行转码 babel-cli（command-line interface）
安装：
```shell
$ npm install --global babel-cli
```

使用：
```shell
# 转码结果写入一个文件
# --out-file 或 -o 参数指定输出文件
$ babel example.js --out-file compiled.js
# 或者
$ babel example.js -o compiled.js

# 整个目录转码
# --out-dir 或 -d 参数指定输出目录
$ babel src --out-dir lib
# 或者
$ babel src -d lib
```


## babel-node
不用单独安装，`babel-cli`附带，使用`babel-node`替代`node`，这样`script.js`本身就不用做任何转码处理。  
可以打开`babel-node`再写代码，也可以直接执行文件。


## babel-register
`babel-register`模块改写`require`命令，为它加上一个钩子。此后，每当使用`require`加载`.js`、`.jsx`、`.es`和`.es6`后缀名的文件，就会先用`Babel`进行转码。

## babel-core
如果某些代码需要调用`Babel`的`API`进行转码，就要使用`babel-core`模块。

## babel-polyfill
Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。

## 浏览器环境

## 在线转换