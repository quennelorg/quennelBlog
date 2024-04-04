---
slug: jestSetup
title: 如何安装jest
authors: quennel
tags: [jest, setup]
date: 2024-04-04T08:00
---

## 如何在ts项目中使用jest
[JEST](https://jestjs.io/docs/getting-started)
### 初始
[Using typescript](https://jestjs.io/docs/getting-started#using-typescript)  
```
yarn add --dev @babel/preset-typescript
```
```
yarn add --dev ts-jest
```
```
yarn add --dev @types/jest
```
### QA

Q： describe不能被使用
A: `import { describe, it, expect } from '@jest/globals';`  

Q:TypeScript：Jest无法解析文件 – 无法在模块外部使用import语句
```
Jest encountered an unexpected token
Details:
SyntaxError: Cannot use import statement outside a module
```  
A: 
1. 确保项目中已经安装了必需的依赖
2. 在项目的根目录下创建一个`jest.config.js`文件，并添加以下配置
```
module.exports = {
 transform: {
   '^.+\\.tsx?$': 'ts-jest',
 },
};
```  
这个配置指定了ts-jest作为Jest的转换器，用于处理TypeScript文件。
3. 在package.json中添加以下脚本：  
```
"scripts": {
 "test": "jest"
}
```

Q: Jest.js error: "Received: serializes to the same string"  
A: Replaced the toBe method with toStrictEqual to make a deep equality comparison