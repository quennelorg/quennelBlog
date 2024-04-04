---
slug: jestSetup
title: How to setup jest
authors: quennel
tags: [jest, setup]
date: 2024-04-04T08:00
---

## How to use jest in ts project
[JEST](https://jestjs.io/docs/getting-started)
### Initial
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

Q： describe cannot be used
A: `import { describe, it, expect } from '@jest/globals';`  

Q:ypeScript: Jest cannot parse file - cannot use import statement outside module
```
Jest encountered an unexpected token
Details:
SyntaxError: Cannot use import statement outside a module
```  
A: 
1. Make sure the necessary dependencies are installed in the project
2. Create a `jest.config.js` file in the root directory of the project and add the following configuration
```
module.exports = {
 transform: {
   '^.+\\.tsx?$': 'ts-jest',
 },
};
```  
This configuration specifies ts-jest as the Jest converter for processing TypeScript files.  
3. Add the following script to package.json：  
```
"scripts": {
 "test": "jest"
}
```  

Q: Jest.js error: "Received: serializes to the same string"  
A: Replaced the toBe method with toStrictEqual to make a deep equality comparison