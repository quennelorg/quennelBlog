---
slug: nodeJS-modules
title: What Happens When We Require() A Modules
authors: quennel
tags: [nodeJs, modules]
date: 2024-05-24T09:44
---


## [CommonJs Modules] (https://nodejs.org/docs/latest/api/modules.html#modules-commonjs-modules)

### resolving loading

#### 导入当前自定义文件模块
```js
// 相对路径：使用 ./ 或 ../ 表示相对于当前文件的路径
const module = require('./relative/path/to/module');

// 绝对路径：直接从文件系统的根路径开始
const module = require('/absolute/path/to/module')
```

#### 导入核心模块
```js
const fs = require('fs');
const http = require('http');
const path = require('path');
```

#### 导入第三方模块，node_modules里面的内容，使用npm安装第三方模块之后就可以用模块名称导入
```js
const express = require('express');
const lodash = require('lodash');
```

require 会缓存已加载的模块。对于同一个模块的多次 require 调用，只会加载一次，并返回相同的模块实例

### [the-module-wrapper] (https://nodejs.org/docs/latest/api/modules.html#the-module-wrapper)
每个模块的代码实际上被包装在一个特殊的函数中。这是 Node.js 模块系统的一部分，它确保每个模块都有自己独立的作用域，以避免全局变量冲突

```js
(function (exports, require, module, __filename, __dirname) {
    // 模块的代码
});
```

当 `Node.js` 加载一个模块时，它会将模块的代码包装在这个函数中，然后调用这个函数。这个函数提供了几个局部变量，分别是 `exports`、`require`、`module`、`__filename` 和 `__dirname`

#### 例子：
这有个模块
```js
// math.js
exports.add = function(a, b) {
    return a + b;
};

exports.subtract = function(a, b) {
    return a - b;
};
```
Node.js 实际上会将这个文件的内容包装在一个函数中，如下所示

```js
(function (exports, require, module, __filename, __dirname) {
    exports.add = function(a, b) {
        return a + b;
    };

    exports.subtract = function(a, b) {
        return a - b;
    };
});
```

然后，Node.js 会调用这个包装函数，并传递相应的参数：

- `exports`：一个对象，用于将模块内容导出
- `require`：一个函数，用于导入其他模块
- `module`：一个对象，代表当前模块
- `__filename`：当前模块的绝对路径
- `__dirname`：当前模块所在目录的绝对路径
这些参数的作用
- `exports`：用于导出模块的公共接口。你可以将要导出的内容赋值给 exports 对象
- `require`：用于引入其他模块的函数
- `module`：代表模块自身，module.exports 是真正导出内容的地方。exports 是 module.exports 的一个引用
- `__filename`：当前模块的绝对路径
- `__dirname`：当前模块所在目录的绝对路径


![img.png](img.png)