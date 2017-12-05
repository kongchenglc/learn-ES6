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

...